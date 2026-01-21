# Free PDF Resources Generator

This directory contains Python scripts to generate professional PDF downloads for The Nursing Collective website.

## Overview

The PDF generators create high-quality, professionally formatted study resources that are offered as free downloads on the pricing page to demonstrate content quality and build the email list.

## Generated PDFs

1. **NCLEX Priority Concepts** (`nclex-priority-concepts.pdf`)
   - 1-page quick reference guide
   - Top 50 NCLEX priority concepts organized by category
   - Perfect for exam prep and clinical rotations

2. **First Clinical Day Survival Guide** (`clinical-day-survival-guide.pdf`)
   - Multi-page comprehensive guide
   - Practical tips for nervous nursing students
   - Covers preparation, day-of strategies, and anxiety management

3. **Nursing School Supply List** (`nursing-supply-list.pdf`)
   - Detailed supply list organized by program level
   - Essential items, intermediate additions, and advanced tools
   - Money-saving tips included

## Setup

### Prerequisites

- Python 3.x
- Virtual environment (included in this directory)
- reportlab library (already installed in venv)

### First-Time Setup

The virtual environment is already configured in this directory. To activate it:

```bash
cd pdf_generators
source venv/bin/activate
```

If you need to reinstall dependencies:

```bash
source venv/bin/activate
pip install reportlab
```

## Usage

### Generate All PDFs

To regenerate all three PDFs at once:

```bash
cd pdf_generators
source venv/bin/activate
python generate_free_pdfs.py
```

### Generate Individual PDFs

To generate a specific PDF:

```bash
source venv/bin/activate
python nclex_priority_concepts.py
python clinical_day_survival.py
python nursing_supply_list.py
```

## Output Location

All generated PDFs are saved to:
```
../assets/downloads/
```

This ensures they're web-accessible at:
```
https://thenursingcollective.pro/assets/downloads/[filename].pdf
```

## Design Standards

### Brand Colors
- **Primary Blue**: `#2E86AB` - Medical blue for headers and branding
- **Secondary Purple**: `#A23B72` - Healthcare accent for subsections
- **Accent Yellow**: `#f59e0b` - Warm accent for highlights
- **Text Primary**: `#1f2937` - Dark gray for body text
- **Text Secondary**: `#6b7280` - Medium gray for secondary text

### Layout Specifications
- **Page Size**: US Letter (8.5" x 11")
- **Margins**: 0.75" sides, 1" top, 0.75" bottom
- **Fonts**: Helvetica family (professional, clean, widely supported)
- **Typography**: Clear hierarchy with proper header levels
- **White Space**: Adequate spacing for readability

### Header & Footer
- **Header**: "The Nursing Collective" in brand blue
- **Footer**: "thenursingcollective.pro | Page X of Y" centered

### Content Guidelines
- Natural language from experienced nurses, not AI-generated tone
- Practical, actionable information students will actually use
- NCLEX-relevant content throughout
- Print-friendly (readable in black & white)
- Proper page breaks to keep related content together

## File Structure

```
pdf_generators/
├── README.md                      # This file
├── generate_free_pdfs.py          # Main script to generate all PDFs
├── nclex_priority_concepts.py     # NCLEX concepts generator
├── clinical_day_survival.py       # Clinical guide generator
├── nursing_supply_list.py         # Supply list generator
└── venv/                          # Python virtual environment
```

## Modifying PDFs

### To Update Content

1. Open the relevant Python file (e.g., `nclex_priority_concepts.py`)
2. Modify the content in the script (look for the main content sections)
3. Regenerate the PDF by running the script
4. Check the output in `../assets/downloads/`

### To Adjust Formatting

- Modify the `ParagraphStyle` definitions for typography changes
- Adjust `TableStyle` settings for table formatting
- Update color variables at the top of each script
- Change spacing with `Spacer(1, X*inch)` where X is the height

### To Add New PDFs

1. Create a new Python file following the existing structure
2. Import the header/footer canvas class for consistency
3. Add the new generator function to `generate_free_pdfs.py`
4. Update this README with the new PDF details

## Technical Notes

### reportlab Library

The PDFs use the reportlab library for generation:
- **Platypus**: High-level layout engine for flowing content
- **Canvas**: Low-level drawing for headers/footers
- **Styles**: Professional typography with ParagraphStyle
- **Tables**: Structured data presentation with TableStyle

### File Size Optimization

PDFs are optimized for web delivery:
- Text-based (not image-based) for searchability
- Compressed using reportlab's default compression
- Reasonable file sizes (typically 50-200 KB per PDF)

### Print Compatibility

All PDFs are designed to print well:
- Standard US Letter size
- Sufficient margins for binding
- Black & white friendly color schemes
- No content cut off at page breaks

## Troubleshooting

### Virtual Environment Issues

If the virtual environment is not working:
```bash
rm -rf venv
python3 -m venv venv
source venv/bin/activate
pip install reportlab
```

### Import Errors

Make sure you're in the `pdf_generators` directory and the virtual environment is activated:
```bash
cd pdf_generators
source venv/bin/activate
```

### Permission Errors

If you get permission errors writing to `assets/downloads/`:
```bash
chmod 755 ../assets/downloads/
```

## Maintenance

### When to Regenerate

Regenerate PDFs when:
- Content needs updating (new guidelines, changed recommendations)
- Formatting improvements are made
- Brand colors or styling change
- Errors or typos are discovered

### Version Control

- The Python scripts are version controlled (committed to git)
- Generated PDFs are also committed so they're deployed with the site
- Virtual environment (`venv/`) is gitignored
- After regenerating, commit both scripts and PDFs if changed

## Website Integration

These PDFs are linked from:
- **Pricing Page**: Free Resources section
- Each PDF has a download button with icon
- Old "Heart & Lung Sounds Guide" has been replaced

## Support

For questions or issues with the PDF generators:
- Check this README first
- Review the Python scripts for inline comments
- Test generate each PDF individually to isolate problems
- Ensure the output directory exists and is writable

---

**Last Updated**: January 2026
**Maintained By**: The Nursing Collective Team
