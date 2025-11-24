document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('darkmode');
    if (!btn) return;

    const saved = localStorage.getItem('theme');
    if (saved === 'dark') document.body.classList.add('dark_mode');

    btn.addEventListener('click', () => {
        document.body.classList.toggle('dark_mode');
        const isDark = document.body.classList.contains('dark_mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
});