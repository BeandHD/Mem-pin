document.addEventListener('DOMContentLoaded', () => {

    const mainbody = document.getElementById("mainbody");
    const createTask = document.getElementById("createTask");
    let taskCounter = 0;

    function updateTaskClass(taskElem, checked) {
        if (!taskElem) return;
        if (checked) {
            taskElem.classList.remove('task_in_progress');
            taskElem.classList.add('task_completed');
        } else {
            taskElem.classList.remove('task_completed');
            taskElem.classList.add('task_in_progress');
        }
    }

    function attachCheckboxListeners(root = mainbody) {
        const checkboxes = root.querySelectorAll('input[type="checkbox"].Task-Checkbox');
        checkboxes.forEach(cb => {
            const taskElem = cb.closest('.Task');
            
            updateTaskClass(taskElem, cb.checked);

            cb.removeEventListener('change', cb._taskChangeHandler);
            cb._taskChangeHandler = () => updateTaskClass(taskElem, cb.checked);
            cb.addEventListener('change', cb._taskChangeHandler);
        });
    }

    mainbody.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            e.stopPropagation();
            e.target.closest('.Task-container').remove();
        }
    });

    createTask.addEventListener('click', () => {
        taskCounter++;

        const container = document.createElement('div');
        container.className = 'Task-container';

        container.innerHTML = `<div class="Task">` +
            `<div class="Task-Button"><input type="checkbox" class="Task-Checkbox"></div>` +
            `<div class="Task-Text" contenteditable="true" placeholder="Type your task/tasks here" id="Editor-${taskCounter}"></div>` +
            `</div>` +
            `<button type="button" class="delete-btn" aria-label="Delete task">x</button>`;

        mainbody.appendChild(container);
        // Attach listener for the newly created checkbox and set initial class
        attachCheckboxListeners(container);
    });

    // Attach to any existing checkboxes on load (for tasks restored from saved content)
    attachCheckboxListeners();

});

jQuery(function ($) {
    $(".Task-Text").on("focusout", function () {
           const element = $(this);
         if (!element.text().trim().length) {
             element.empty();
         }
    });
});
