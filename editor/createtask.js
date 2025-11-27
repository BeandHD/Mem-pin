document.addEventListener('DOMContentLoaded', () => {
 
    function addDeleteListeners() {
        const mainbody = document.getElementById("mainbody");
        const deleteButtons = mainbody.querySelectorAll('.delete-btn');
        deleteButtons.forEach(del => {
            del.addEventListener('click', (e) => {
                e.stopPropagation();
                del.parentElement.remove();
            });
        });
    }

    function addtask(){
        const createTask = document.getElementById("createTask");
        const mainbody = document.getElementById("mainbody");
        let taskCounter = 0;
        createTask.addEventListener('click', () => {
                taskCounter++;
                const container = document.createElement('div');
                container.className = 'Task-container';
                container.innerHTML = `
                    <div class="Task">
                        <div class="Task-Button">
                            <button class="Task-compl-Button"></button>
                        </div>
                        <div class="Task-Text" contenteditable="true"
                            aria-placeholder="Type your task/tasks here"
                            id="Editor-${taskCounter}"></div>
                    </div>
                `;
                const del = document.createElement('deletebutton');
                del.className = 'delete-btn';
                del.setAttribute('aria-label', 'Delete task');
                del.textContent = 'x';
                del.addEventListener('click', (e) => {
                    e.stopPropagation();
                    container.remove();
                });
                container.appendChild(del);
            mainbody.appendChild(container);   
        });
    }

    addtask();
    addDeleteListeners();
});