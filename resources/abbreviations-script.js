const searchInput = document.getElementById('abbrev-search');
const searchClear = document.getElementById('search-clear');
const noResults = document.getElementById('no-results');
const sections = document.querySelectorAll('.abbrev-section');
const doNotUseSection = document.querySelector('.do-not-use');

searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase().trim();

    // Show/hide clear button
    searchClear.classList.toggle('visible', query.length > 0);

    if (query.length === 0) {
        // Reset - show everything
        sections.forEach(section => {
            section.classList.remove('hidden');
            section.querySelectorAll('.abbrev-item').forEach(item => {
                item.classList.remove('hidden');
            });
        });
        doNotUseSection.classList.remove('hidden');
        noResults.classList.remove('visible');
        return;
    }

    let hasResults = false;

    // Hide do not use section when searching (unless searching for specific terms)
    const doNotUseTerms = ['do not', 'don\'t', 'danger', 'banned', 'joint commission'];
    const showDoNotUse = doNotUseTerms.some(term => query.includes(term));
    doNotUseSection.classList.toggle('hidden', !showDoNotUse);
    if (showDoNotUse) hasResults = true;

    // Filter abbreviation sections
    sections.forEach(section => {
        const items = section.querySelectorAll('.abbrev-item');
        let sectionHasMatch = false;

        items.forEach(item => {
            const term = item.querySelector('.abbrev-term').textContent.toLowerCase();
            const def = item.querySelector('.abbrev-def').textContent.toLowerCase();
            const matches = term.includes(query) || def.includes(query);

            item.classList.toggle('hidden', !matches);
            if (matches) {
                sectionHasMatch = true;
                hasResults = true;
            }
        });

        section.classList.toggle('hidden', !sectionHasMatch);
    });

    noResults.classList.toggle('visible', !hasResults);
});

searchClear.addEventListener('click', function() {
    searchInput.value = '';
    searchInput.dispatchEvent(new Event('input'));
    searchInput.focus();
});
