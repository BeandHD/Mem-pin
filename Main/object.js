const popup = document.getElementById("popup");
document.getElementById("newPageBtn").onclick = () => popup.classList.remove("hidden");
document.getElementById("createBtn").onclick = createPage;

function createPage() {
  const name = document.getElementById("pageNameInput").value.trim();
  if (!name) return;

  const pages = JSON.parse(localStorage.getItem("pages") || "[]");

  const id = Date.now(); // unique page id
  pages.push({ id, name, content: "" });

  localStorage.setItem("pages", JSON.stringify(pages));
  popup.classList.add("hidden");
  loadPages();
}
function loadPages() {
  const pages = JSON.parse(localStorage.getItem("pages") || "[]");
  const grid = document.getElementById("pageGrid");
  grid.innerHTML = "";

  pages.forEach(page => {
    const tile = document.createElement("div");
    tile.className = "pageTile";
    tile.innerText = page.name;
    tile.onclick = () => {
      window.location.href = `editor.html?id=${page.id}`;
    };
    grid.appendChild(tile);
  });
}

loadPages();