document.addEventListener('DOMContentLoaded', () => {
        const params = new URLSearchParams(window.location.search);
        const pageId = parseInt(params.get("id"));

        const pages = JSON.parse(localStorage.getItem("pages") || "[]");
        const page = pages.find(p => p.id === pageId);
        if (!page) {
            console.error("Page not found");
            return;
        }

        const mainbody = document.getElementById("mainbody");
        mainbody.innerHTML = page.content;
        
        const taskContainers = mainbody.querySelectorAll('.Task-container');
        taskContainers.forEach(container => {
            const del = document.createElement('deletebutton');
            del.className = 'delete-btn';
            del.setAttribute('aria-label', 'Delete task');
            del.textContent = 'x';
            del.addEventListener('click', (e) => {
                e.stopPropagation();
                container.remove();
            });
            container.appendChild(del);
        });
        
        document.getElementById("saveBtn").onclick = () => {
            const clone = mainbody.cloneNode(true);
            const deleteButtons = clone.querySelectorAll('.delete-btn');
            deleteButtons.forEach(btn => btn.remove());
            page.content = clone.innerHTML;
            localStorage.setItem("pages", JSON.stringify(pages));
            console.log("Page saved");
        };
});