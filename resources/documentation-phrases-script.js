document.querySelectorAll('.phrase-item').forEach(item => {
    item.addEventListener('click', function() {
        // Get the text content, replacing placeholder spans with bracket notation
        let text = this.innerHTML;
        // Convert placeholder spans to bracketed text
        text = text.replace(/<span class="placeholder">\[([^\]]+)\]<\/span>/g, '[$1]');
        // Remove any remaining HTML tags
        text = text.replace(/<[^>]*>/g, '');
        // Trim whitespace
        text = text.trim();

        // Copy to clipboard
        navigator.clipboard.writeText(text).then(() => {
            // Visual feedback
            this.classList.add('copied');
            setTimeout(() => {
                this.classList.remove('copied');
            }, 1500);
        });
    });
});
