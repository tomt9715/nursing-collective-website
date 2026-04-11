document.querySelectorAll('.faq-question').forEach(function(btn) {
    btn.addEventListener('click', function() {
        var item = this.closest('.faq-item');
        var wasActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(function(i) {
            i.classList.remove('active');
            i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            var ans = i.querySelector('.faq-answer');
            if (ans) ans.style.display = 'none';
        });
        if (!wasActive) {
            item.classList.add('active');
            this.setAttribute('aria-expanded', 'true');
            var answer = item.querySelector('.faq-answer');
            if (answer) answer.style.display = 'block';
        }
    });
});
