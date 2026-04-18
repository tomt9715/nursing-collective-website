#!/usr/bin/env python3
"""
Build guides/catalog.json from CLASS_CATALOG in my-guides-script.js.

This is the single source of truth for guides on the platform. The
frontend already curates CLASS_CATALOG when new guides ship (per
CLAUDE.md step 7), so we just derive a structured JSON from it that
the backend can consume.

Usage:
    python3 scripts/build-guide-catalog.py

Regenerates guides/catalog.json. Commit the result.
"""

import json
import re
import sys
import datetime
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
SRC = REPO_ROOT / 'my-guides-script.js'
OUT = REPO_ROOT / 'guides' / 'catalog.json'


# ── Keyword enrichment by category slug ──────────────────────────
# Category slug → extra synonym keywords (added on top of class/category
# names and guide title words). Update when categories diverge from
# natural language (e.g. "gu" also means "genitourinary", "renal", etc).
CATEGORY_SYNONYMS = {
    'fundamentals': ['assessment', 'skills', 'clinical'],
    'cardiovascular': ['cardiac', 'heart', 'cv', 'cardiology'],
    'respiratory': ['pulmonary', 'lung', 'breathing'],
    'endocrine': ['hormone', 'metabolic'],
    'neurological': ['neuro', 'neurology', 'brain'],
    'gastrointestinal': ['gi', 'digestive', 'bowel'],
    'musculoskeletal': ['ortho', 'orthopedic', 'bone', 'joint'],
    'renal-urinary': ['renal', 'kidney', 'urinary', 'uti', 'pyelonephritis', 'cystitis', 'bladder', 'genitourinary', 'gu'],
    'maternal-newborn': ['maternity', 'maternal', 'newborn', 'ob', 'obstetric', 'antepartum'],
    'pediatric-cardiac': ['pediatric', 'cardiac', 'cardiovascular', 'congenital', 'heart'],
    'pediatric-gi': ['pediatric', 'gi', 'gastrointestinal', 'digestive'],
    'pediatric-gu': ['pediatric', 'gu', 'genitourinary', 'urinary', 'renal', 'kidney'],
    'pediatric-musculoskeletal': ['pediatric', 'musculoskeletal', 'ortho', 'orthopedic', 'bone'],
    'pediatric-skin': ['pediatric', 'skin', 'dermatologic', 'dermatology', 'integumentary'],
    'pediatric-hematology-oncology': ['pediatric', 'hematology', 'hematologic', 'oncology', 'oncologic', 'cancer', 'blood'],
    'pediatric-immune-rheumatology': ['pediatric', 'immune', 'immunology', 'immunologic', 'autoimmune', 'rheumatology'],
    'pediatric-foundations': ['pediatric', 'peds'],
    'psychiatric-nursing': ['mental', 'psych', 'psychiatric', 'behavioral'],
    'pharmacology': ['pharmacology', 'medications', 'drugs'],
}


POPULATION_BY_CLASS = {
    'fundamentals': 'mixed',
    'med-surg': 'adult',
    'maternal-newborn': 'maternal',
    'pediatrics': 'pediatric',
    'mental-health': 'mixed',
    'pharmacology': 'mixed',
}


def slugify(s):
    """Turn 'Pediatric Cardiac' into 'pediatric-cardiac'."""
    s = re.sub(r'[&/]', ' ', s)
    s = re.sub(r'[^a-zA-Z0-9]+', '-', s).strip('-').lower()
    return s


def tokenize(s):
    """Break a string into lowercase word tokens, filtering junk."""
    tokens = re.findall(r'[a-zA-Z]+', (s or '').lower())
    STOP = {'and', 'or', 'the', 'a', 'an', 'of', 'in', 'on', 'for', 'to', 'with', 'nursing', 'care', 'disorders', 'disorder'}
    return [t for t in tokens if t not in STOP and len(t) > 1]


def extract_classes(js_src):
    """
    Walk my-guides-script.js to extract each class entry:
      [{ id, name, topics: [{ category, guides: [{ name, file }] }] }]

    Relies on regex rather than a full JS parser, which is fine because
    CLASS_CATALOG has a predictable shape. If this breaks, CLASS_CATALOG
    was reformatted — adjust the regexes.
    """
    # Find the CLASS_CATALOG block
    start_match = re.search(r'var\s+CLASS_CATALOG\s*=\s*\[', js_src)
    if not start_match:
        raise RuntimeError('Could not find CLASS_CATALOG in source')

    # Walk character by character to find the matching closing bracket
    depth = 0
    i = start_match.end() - 1  # points at the opening '['
    end = None
    in_string = False
    string_char = None
    prev = ''
    while i < len(js_src):
        ch = js_src[i]
        if in_string:
            if ch == string_char and prev != '\\':
                in_string = False
        else:
            if ch in ("'", '"'):
                in_string = True
                string_char = ch
            elif ch == '[':
                depth += 1
            elif ch == ']':
                depth -= 1
                if depth == 0:
                    end = i
                    break
        prev = ch
        i += 1

    if end is None:
        raise RuntimeError('Unterminated CLASS_CATALOG array')

    block = js_src[start_match.end() - 1:end + 1]

    # Split into class entries: each is a top-level object at depth 1
    classes = []
    depth = 0
    cur_start = None
    i = 0
    in_string = False
    string_char = None
    prev = ''
    while i < len(block):
        ch = block[i]
        if in_string:
            if ch == string_char and prev != '\\':
                in_string = False
        else:
            if ch in ("'", '"'):
                in_string = True
                string_char = ch
            elif ch == '{':
                if depth == 0:
                    cur_start = i
                depth += 1
            elif ch == '}':
                depth -= 1
                if depth == 0 and cur_start is not None:
                    classes.append(block[cur_start:i + 1])
                    cur_start = None
        prev = ch
        i += 1

    out = []
    for class_block in classes:
        class_id_m = re.search(r"\bid\s*:\s*'([^']+)'", class_block)
        class_name_m = re.search(r"\bname\s*:\s*'([^']+)'", class_block)
        if not class_id_m or not class_name_m:
            continue
        class_id = class_id_m.group(1)
        class_name = class_name_m.group(1)

        # Extract each topic category: find { category: '...', ..., guides: [...] }
        topic_iter = re.finditer(r"category\s*:\s*'([^']+)'", class_block)
        topics_meta = []
        for m in topic_iter:
            # Find the guides array that belongs to this category
            # by scanning forward until we hit 'guides: ['
            region = class_block[m.end():]
            guides_m = re.search(r"guides\s*:\s*\[", region)
            if not guides_m:
                continue
            # Walk to find the matching closing bracket of this guides array
            gdepth = 1
            gi = guides_m.end()
            in_s = False
            sc = None
            gp = ''
            while gi < len(region) and gdepth > 0:
                c = region[gi]
                if in_s:
                    if c == sc and gp != '\\':
                        in_s = False
                else:
                    if c in ("'", '"'):
                        in_s = True
                        sc = c
                    elif c == '[':
                        gdepth += 1
                    elif c == ']':
                        gdepth -= 1
                gp = c
                gi += 1
            guides_text = region[guides_m.end():gi - 1]

            guides = []
            for gm in re.finditer(r"\{\s*name\s*:\s*'([^']+)'\s*,\s*file\s*:\s*'([^']+)'\s*\}", guides_text):
                guides.append({'name': gm.group(1), 'file': gm.group(2)})

            topics_meta.append({
                'category_name': m.group(1),
                'guides': guides,
            })

        out.append({
            'id': class_id,
            'name': class_name,
            'topics': topics_meta,
        })

    return out


def build_catalog(classes):
    guides = {}
    for cls in classes:
        class_id = cls['id']
        class_name = cls['name']
        population = POPULATION_BY_CLASS.get(class_id, 'mixed')

        for topic in cls['topics']:
            category_name = topic['category_name']
            category_slug = slugify(category_name)
            category_keywords = CATEGORY_SYNONYMS.get(category_slug, [])

            for g in topic['guides']:
                # Keyword set: class name tokens + category tokens + synonyms + title tokens
                keywords = set()
                keywords.update(tokenize(class_name))
                keywords.update(tokenize(category_name))
                keywords.update(category_keywords)
                keywords.update(tokenize(g['name']))

                guides[g['file']] = {
                    'title': g['name'],
                    'class': class_id,
                    'class_name': class_name,
                    'category': category_slug,
                    'category_name': category_name,
                    'population': population,
                    'keywords': sorted(keywords),
                }

    return {
        'version': 1,
        'generated_at': datetime.datetime.now(datetime.timezone.utc).isoformat(),
        'guides': guides,
    }


def main():
    if not SRC.exists():
        print(f'ERROR: {SRC} not found', file=sys.stderr)
        sys.exit(1)

    js_src = SRC.read_text(encoding='utf-8')
    classes = extract_classes(js_src)

    catalog = build_catalog(classes)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(catalog, indent=2) + '\n', encoding='utf-8')

    guide_count = len(catalog['guides'])
    class_count = len(classes)
    print(f'✓ Wrote {OUT.relative_to(REPO_ROOT)} — {guide_count} guides across {class_count} classes')


if __name__ == '__main__':
    main()
