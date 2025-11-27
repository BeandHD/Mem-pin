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
        document.getElementById("saveBtn").onclick = () => {
            page.content = (mainbody.innerHTML);
            localStorage.setItem("pages", JSON.stringify(pages));
            console.log("Page saved");
        };
});