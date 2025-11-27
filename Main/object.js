document.addEventListener('DOMContentLoaded', () => {
    const openbtn = document.getElementById('openpop');
    const closebtn = document.getElementById('closePop');
    const popup = document.getElementById('pop');
    const createBtn = document.getElementById('createBoard');
    const grid = document.getElementById('pagegrid');

    if (openbtn && popup) openbtn.addEventListener('click', () => popup.classList.add('open'));
    if (closebtn && popup) closebtn.addEventListener('click', () => popup.classList.remove('open'));
    if (createBtn) createBtn.addEventListener('click', createboard);
        loadboard();    
    function createboard() {
        const input = document.getElementById('boardname');
        const name = input ? input.value.trim() : '';
        if (!name) return;

        const pages = JSON.parse(localStorage.getItem('pages') || '[]');
        const id = Date.now();

        pages.push({ id, name, content: '' });
        localStorage.setItem('pages', JSON.stringify(pages));
        if (input) input.value = '';
        if (popup) popup.classList.remove('open');

        loadboard();
    }

    function loadboard() {
        const pages = JSON.parse(localStorage.getItem('pages') || '[]');
        if (!grid) return;

        const createTile = grid.querySelector('.create_button');

        grid.innerHTML = '';
        if (createTile) grid.appendChild(createTile);

        pages.forEach(page => {
            const tile = document.createElement('div');
            tile.className = 'page-tile';
            tile.dataset.id = page.id;

            const label = document.createElement('div');
            label.className = 'page-title';
            label.textContent = page.name;
            tile.appendChild(label);

            const del = document.createElement('deletebutton');
            del.className = 'delete-btn';
            del.setAttribute('aria-label', 'Delete board');
            del.textContent = 'x';
            del.addEventListener('click', (e) => {
                e.stopPropagation();
                const ok = confirm(`Delete board "${page.name}"?`);
                if (!ok) return;
                const pagesList = JSON.parse(localStorage.getItem('pages') || '[]');
                const idx = pagesList.findIndex(p => p.id === page.id);
                if (idx > -1) {
                    pagesList.splice(idx, 1);
                    localStorage.setItem('pages', JSON.stringify(pagesList));
                    loadboard();
                }
            });
            tile.appendChild(del);
            tile.addEventListener('click', () => window.location.href = `../editor/text.html?id=${page.id}`);
            grid.appendChild(tile);
        });
    }
});