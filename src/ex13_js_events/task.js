const userClick = document.querySelector(".user-menu");
userClick.addEventListener('click', createSubMenu);
function createSubMenu() {
    console.log(!document.querySelector(".user-submenu"));
    if (!document.querySelector(".user-submenu")) {
        const arrow = document.querySelector(".arrow");
        const ul = document.createElement("ul");
        arrow.className += " reflected-arrow";
        ul.className = "user-submenu";
        userClick.append(ul);
        for (i = 0; i < 3; i++) {
            ul.append(document.createElement('li'))
        }
        const subItems = ul.children;
        subItems[0].innerHTML = "<a href = '#'>My account</a>";
        subItems[1].innerHTML = "<a href = '#'>My task</a>";
        subItems[2].innerHTML = "<a href = '#'>Log out</a>";
    } else {
        closeMenu();
    }
}
function closeMenu() {
    const arrow = document.querySelector(".arrow");
    arrow.className = "arrow";
    const ul = document.querySelector(".user-submenu");
    ul.parentNode.removeChild(ul);
}

localStorage.setItem("backlog", JSON.stringify({
    title: "backlog",
    issue: []
}));
localStorage.setItem("ready", JSON.stringify({
    title: "ready",
    issue: []
}));
localStorage.setItem("progress", JSON.stringify({
    title: "progress",
    issue: []
}));
localStorage.setItem("finished", JSON.stringify({
    title: "finished",
    issue: []
}));
let isButtonClicked = false;
function addTaskFromDropdown(currentButtonClass, selectName, previos, current, bodyPrevios) {
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
    currentDropdown.remove();
    deleteItem(bodyPrevios, index);
}
function createDropDown(localStorageProperty, className, buttonName, tabIndex, handler) {
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
            document.querySelector("." + className).addEventListener("change", handler)
        }
        isButtonClicked = true;
    }
}
document.querySelector(".backlog-button").addEventListener("click", addItemInBacklog);
function addItemInBacklog() {
    if (!isButtonClicked === true) {
        const currentTask = document.createElement("input");
        const backlog = document.querySelector(".backlog-button");
        currentTask.type = "text";
        currentTask.className = "current-backlog-task";
        currentTask.setAttribute("tabindex", "2");
        backlog.before(currentTask);
        document.querySelector(".current-backlog-task").addEventListener("change", addTaskInStorage);
        isButtonClicked = true;
    }
};
function addTaskInStorage() {
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
        input.remove();
        initialization()
    }
    isButtonClicked = false;
}


document.querySelector(".ready-button").addEventListener("click", () => {
    createDropDown("backlog", "current-ready-task", ".ready-button", "4", changeReady);
});
function changeReady() {
    addTaskFromDropdown(".ready-button", ".current-ready-task", "backlog", "ready", ".body-backlog");
    initialization();
    isButtonClicked = false;
}
document.querySelector(".progress-button").addEventListener("click", () => {
    createDropDown("ready", "current-progress-task", ".progress-button", "6", changeProgress);
});
function changeProgress() {
    addTaskFromDropdown(".progress-button", ".current-progress-task", "ready", "progress", ".body-ready");
    initialization();
    isButtonClicked = false;
}
document.querySelector(".finished-button").addEventListener("click", () => {
    createDropDown("progress", "current-finished-task", ".finished-button", "8", changeFinished);
});
function changeFinished() {
    addTaskFromDropdown(".finished-button", ".current-finished-task", "progress", "finished", ".body-progress");
    initialization();
    isButtonClicked = false;
}
window.addEventListener("load", initialization)
function initialization() {
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
function deleteItem(className, index) {
    console.log(isButtonClicked);
    const element = document.querySelector(className);
    element.removeChild(document.querySelectorAll(".task-item")[index]);
}