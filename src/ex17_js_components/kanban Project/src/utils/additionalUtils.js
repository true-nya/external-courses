export function deleteItem(className, index) {
    const element = document.querySelector(className);
    element.removeChild(document.querySelectorAll(".task-item")[index]);
}
export function addTaskInStorage() {
    const input = document.querySelector(".current-backlog-task");
    const backlog = document.querySelector(".backlog-button");
    const currentObject = JSON.parse(localStorage.getItem("backlog"));
    if (input.value !== "") {
        const task = document.createElement('div');
        currentObject.issue.push({ id: "task" + currentObject.issue.length, name: input.value });
        localStorage.setItem("backlog", JSON.stringify(currentObject));
        task.className = "task-item";
        task.innerHTML = input.value;
        backlog.before(task);
    }
    input.remove();
    initialization();
    isButtonClicked = false;
}