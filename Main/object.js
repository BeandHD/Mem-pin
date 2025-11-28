document.addEventListener('DOMContentLoaded', () => {


    const openBtn = document.getElementById('openpop');
    const closeBtn = document.getElementById('closePop');
    const popup = document.getElementById('pop');
    const createBtn = document.getElementById('createBoard');
    const grid = document.getElementById('pagegrid');


    if (openBtn && popup) {
        openBtn.addEventListener('click', () => popup.classList.add('open'));
    }
    if (closeBtn && popup) {
        closeBtn.addEventListener('click', () => popup.classList.remove('open'));
    }

    if (createBtn) {
        createBtn.addEventListener('click', createBoard);
    }

    loadBoards();

    function createBoard() {
        const input = document.getElementById('boardname');
        const boardName = input ? input.value.trim() : '';
        if (!boardName) return;

        const pages = JSON.parse(localStorage.getItem('pages') || '[]');

        const newPage = {
            id: Date.now(),
            name: boardName,
            content: ''
        };

        pages.push(newPage);
        localStorage.setItem('pages', JSON.stringify(pages));

        if (input) input.value = '';
        if (popup) popup.classList.remove('open');

        loadBoards();
    }

    function loadBoards() {

        const pages = JSON.parse(localStorage.getItem('pages') || '[]');

        const createTile = grid.querySelector('.create_button');
        grid.innerHTML = '';

        if (createTile) grid.appendChild(createTile);

        pages.forEach(page => {
            const tile = document.createElement('div');
            tile.className = 'page-tile';
            tile.dataset.id = page.id;

            const titleEl = document.createElement('div');
            titleEl.className = 'page-title';
            titleEl.textContent = page.name;
            tile.appendChild(titleEl);

            const delBtn = document.createElement('button');
            delBtn.type = 'button';
            delBtn.className = 'delete-btn';
            delBtn.setAttribute('aria-label', 'Delete board');
            delBtn.textContent = 'x';

            delBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                deleteBoard(page.id, page.name);
            });

            tile.appendChild(delBtn);

            tile.addEventListener('click', () => {
                window.location.href = `../editor/text.html?id=${page.id}`;
            });

            grid.appendChild(tile);
        });
    }

    function deleteBoard(id, name) {
        const confirmed = confirm(`Delete board "${name}"?`);
        if (!confirmed) return;

        const pages = JSON.parse(localStorage.getItem('pages') || '[]');
        const updatedPages = pages.filter(p => p.id !== id);

        localStorage.setItem('pages', JSON.stringify(updatedPages));

        loadBoards();
    }

});
