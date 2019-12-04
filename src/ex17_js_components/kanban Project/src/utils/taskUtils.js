import { deleteItem, addTaskInStorage } from "./additionalUtils.js"
export function addTaskFromDropdown(currentButtonClass, selectName, previos, current, bodyPrevios) {
    const currentButton = document.querySelector(currentButtonClass);
    const currentDropdown = document.querySelector(selectName);
    const index = currentDropdown.options.selectedIndex - 1;
    const previousObject = JSON.parse(localStorage.getItem(previos));
    const currentObject = JSON.parse(localStorage.getItem(current));
    const bufferTask = Object.assign({}, previousObject.issue[index]);
    bufferTask.id = 'task' + currentObject.issue.length;
    previousObject.issue.splice(index, 1);
    localStorage.setItem(previos, JSON.stringify(previousObject));
    currentObject.issue.push(bufferTask);
    localStorage.setItem(current, JSON.stringify(currentObject));
    const task = document.createElement('div');
    task.className = "task-item";
    task.innerHTML = bufferTask.name;
    currentButton.before(task);
    deleteItem(bodyPrevios, index);
    currentDropdown.remove();
}
export function createDropDown(localStorageProperty, className, buttonName, tabIndex, handler) {
    initialization()
    if (!isButtonClicked === true) {
        if (JSON.parse(localStorage.getItem(localStorageProperty)).issue.length > 0) {
            const ready = document.querySelector(buttonName);
            const currentDropdown = document.createElement("select");
            currentDropdown.className = className;
            currentDropdown.setAttribute("tabindex", tabIndex);
            ready.before(currentDropdown);
            const currentObject = JSON.parse(localStorage.getItem(localStorageProperty));
            currentDropdown.append(new Option("choose task:"))
            for (i = 0; i < currentObject.issue.length; i++) {
                currentDropdown.append(new Option(currentObject.issue[i].name, currentObject.issue[i].id))
            };
            document.querySelector("." + className).addEventListener("change", handler);
            document.querySelector("." + className).addEventListener("blur", () => {
                if (!currentDropdown.selectedIndex) {
                    currentDropdown.remove();
                    isButtonClicked = false;
                }
            });
        }
        isButtonClicked = true;
    }
}
export function addItemInBacklog() {
    if (!isButtonClicked === true) {
        const currentTask = document.createElement("input");
        const backlog = document.querySelector(".backlog-button");
        currentTask.type = "text";
        currentTask.className = "current-backlog-task";
        currentTask.setAttribute("tabindex", "2");
        backlog.before(currentTask);
        document.querySelector(".current-backlog-task").addEventListener("blur", addTaskInStorage);
        isButtonClicked = true;
    }
}
export function initialization() {
    if (JSON.parse(localStorage.getItem("backlog")).issue.length === 0) {
        document.querySelector(".ready-button").setAttribute("disabled", "disabled");
    } else {
        document.querySelector(".ready-button").removeAttribute("disabled");
    };
    if (JSON.parse(localStorage.getItem("ready")).issue.length === 0) {
        document.querySelector(".progress-button").setAttribute("disabled", "disabled");
    }
    else {
        document.querySelector(".progress-button").removeAttribute("disabled");
    }
    if (JSON.parse(localStorage.getItem("progress")).issue.length === 0) {
        document.querySelector(".finished-button").setAttribute("disabled", "disabled");
    } else {
        document.querySelector(".finished-button").removeAttribute("disabled");
    }
}