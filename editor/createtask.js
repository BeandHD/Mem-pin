document.addEventListener('DOMContentLoaded', () => {
 
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
            mainbody.appendChild(container);   
        });
    }

    addtask();
});