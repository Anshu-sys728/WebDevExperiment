// Add a task to the page and create its delete button.
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const message = document.getElementById("message");

taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskText = taskInput.value.trim();
    if (taskText === "") {
        message.textContent = "Please enter a task.";
        taskInput.focus();
        return;
    }

    const listItem = document.createElement("li");
    const taskLabel = document.createElement("span");
    const deleteButton = document.createElement("button");

    // textContent treats the input as text instead of interpreting it as HTML.
    taskLabel.textContent = taskText;
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";
    deleteButton.setAttribute("aria-label", "Delete task: " + taskText);
    deleteButton.addEventListener("click", function () {
        listItem.remove();
    });

    listItem.append(taskLabel, deleteButton);
    taskList.appendChild(listItem);
    taskInput.value = "";
    message.textContent = "";
    taskInput.focus();
});
