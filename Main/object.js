document.getElementById('button').addEventListener('click', addElement);

function addElement() {
  // create a new div element
  const newDiv = document.createElement("div");

  // and give it some content
   newDiv.classList.add("child");

  // add the newly created element and its content into the DOM
  const parentDiv = document.getElementById("parentDiv");
  const childDiv = document.getElementById("childDiv");
  document.body.insertBefore(childDiv);
}

addElement();