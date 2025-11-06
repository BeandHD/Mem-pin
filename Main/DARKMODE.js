// Attach the toggle to the dark mode button and toggle the class on <body>
const btn = document.getElementById('darkmode');
if (btn) {
   btn.addEventListener('click', toggleDark);
}

function toggleDark(e){
   if (e) e.stopPropagation();
   const element = document.body;
   element.classList.toggle('dark_mode');
   element.classList.toggle('light_mode');
}