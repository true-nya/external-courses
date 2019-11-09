let userClick = document.querySelector(".user-menu");
userClick.addEventListener('click', createSubMenu);
function createSubMenu() {
    console.log(!document.querySelector(".user-submenu"));
    if (!document.querySelector(".user-submenu")) {
        let arrow = document.querySelector(".arrow");
        let ul = document.createElement("ul");
        arrow.className += " reflected-arrow";
        ul.className = "user-submenu";
        userClick.append(ul);
        for (i = 0; i < 3; i++) {
            ul.append(document.createElement('li'))
        }
        let subItems = ul.children;
        subItems[0].innerHTML = "<a href = '#'>My account</a>";
        subItems[1].innerHTML = "<a href = '#'>My task</a>";
        subItems[2].innerHTML = "<a href = '#'>Log out</a>";
    } else {
        closeMenu();
    }
}
function closeMenu() {
    let arrow = document.querySelector(".arrow");
    arrow.className = "arrow";
    let ul = document.querySelector(".user-submenu");
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

function addTaskFromDropdown(currentButtonClass, selectName, previos, current, bodyPrevios) {
    let currentButton = document.querySelector(currentButtonClass);
    let currentDropdown = document.querySelector(selectName);
    let index = currentDropdown.options.selectedIndex - 1;
    let previousObject = JSON.parse(localStorage.getItem(previos));
    let currentObject = JSON.parse(localStorage.getItem(current));
    let bufferTask = Object.assign({}, previousObject.issue[index]);
    bufferTask.id = 'task' + currentObject.issue.length;
    previousObject.issue.splice(index, 1);
    localStorage.setItem(previos, JSON.stringify(previousObject));
    currentObject.issue.push(bufferTask);
    localStorage.setItem(current, JSON.stringify(currentObject));
    let task = document.createElement('div');
    task.className = "task-item";
    task.innerHTML = bufferTask.name;
    currentButton.before(task);
    currentDropdown.remove();
    deleteItem(bodyPrevios, index);
}
function createDropDown(localStorageProperty, className, buttonName, tabIndex, handler) {
    initialization()
    if (JSON.parse(localStorage.getItem(localStorageProperty)).issue.length > 0) {
        let ready = document.querySelector(buttonName);
        let currentDropdown = document.createElement("select");
        currentDropdown.className = className;
        currentDropdown.setAttribute("tabindex", tabIndex);
        ready.before(currentDropdown);
        let currentObject = JSON.parse(localStorage.getItem(localStorageProperty));
        currentDropdown.append(new Option("choose task:"))
        for (i = 0; i < currentObject.issue.length; i++) {
            currentDropdown.append(new Option(currentObject.issue[i].name, currentObject.issue[i].id))
        };
        document.querySelector("." + className).addEventListener("change", handler)
    }
}
document.querySelector(".backlog-button").addEventListener("click", addItemInBacklog);
function addItemInBacklog() {
    let currentTask = document.createElement("input");
    let backlog = document.querySelector(".backlog-button");
    currentTask.type = "text";
    currentTask.className = "current-backlog-task";
    currentTask.setAttribute("required", "required");
    currentTask.setAttribute("tabindex", "2");
    backlog.before(currentTask);
    document.querySelector(".current-backlog-task").addEventListener("change", addTaskInStorage);
};
function addTaskInStorage() {
    let input = document.querySelector(".current-backlog-task");
    let backlog = document.querySelector(".backlog-button");
    let currentObject = JSON.parse(localStorage.getItem("backlog"));
    if (input.value !== "") {
        let task = document.createElement('div');
        currentObject.issue.push({ id: "task" + currentObject.issue.length, name: input.value });
        localStorage.setItem("backlog", JSON.stringify(currentObject));
        task.className = "task-item";
        task.innerHTML = input.value;
        backlog.before(task);
        input.remove();
        initialization()
    }
}
document.querySelector(".ready-button").addEventListener("click", addItemInReady);
function addItemInReady() {
    createDropDown("backlog", "current-ready-task", ".ready-button", "4", changeReady);
}
function changeReady() {
    addTaskFromDropdown(".ready-button", ".current-ready-task", "backlog", "ready", ".body-backlog");
    initialization();
}
document.querySelector(".progress-button").addEventListener("click", addItemInProgress);
function addItemInProgress() {
    createDropDown("ready", "current-progress-task", ".progress-button", "6", changeProgress);
};
function changeProgress() {
    addTaskFromDropdown(".progress-button", ".current-progress-task", "ready", "progress", ".body-ready");
    initialization();
}
document.querySelector(".finished-button").addEventListener("click", addItemInFinished);
function addItemInFinished() {
    createDropDown("progress", "current-finished-task", ".finished-button", "8", changeFinished);
}
function changeFinished() {
    addTaskFromDropdown(".finished-button", ".current-finished-task", "progress", "finished", ".body-progress");
    initialization();
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
        document.querySelector(".finished-buton").removeAttribute("disabled");
    }
}
function deleteItem(className, index) {
    let element = document.querySelector(className);
    element.removeChild(document.querySelectorAll(".task-item")[index]);
}