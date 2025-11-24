 const params = new URLSearchParams(window.location.search);
        const pageId = parseInt(params.get("id"));

        const pages = JSON.parse(localStorage.getItem("pages") || "[]");
        const page = pages.find(p => p.id === pageId);

        const editor = document.getElementById("editor");
        const pageTitle = document.getElementById("pageTitle");

        pageTitle.textContent = page.name;
        editor.innerHTML = page.content;

        document.getElementById("saveBtn").onclick = () => {
            page.content = editor.innerHTML;
            localStorage.setItem("pages", JSON.stringify(pages));
            alert("Saved!");
        };