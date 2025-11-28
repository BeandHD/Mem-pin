document.addEventListener('DOMContentLoaded', () => {


    const params = new URLSearchParams(window.location.search);
    const pageId = Number(params.get("id"));

    if (isNaN(pageId)) {
        console.error("couldnt load page");
        return;
    }


    const pages = JSON.parse(localStorage.getItem("pages") || "[]");
    const page = pages.find(p => p.id === pageId);

    if (!page) {
        console.error("Page not found");
        return;
    }

    const mainbody = document.getElementById("mainbody");
    mainbody.innerHTML = page.content || "";
    
    
    const saveBtn = document.getElementById("saveBtn");
    if (saveBtn) {
        saveBtn.onclick = () => {
            const checkboxes = mainbody.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(cb => {
                if (cb.checked) {
                    cb.setAttribute('checked', '');
                } else {
                    cb.removeAttribute('checked');
                }
            });
            page.content = mainbody.innerHTML;
            localStorage.setItem("pages", JSON.stringify(pages));
        };
    }
});
