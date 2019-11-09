
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

document.querySelector(".backlog-button").addEventListener("click", addItemInBacklog);
function addItemInBacklog() {
    let currentTask = document.createElement("input");
    let backlog = document.querySelector(".backlog-button");
    currentTask.type = "text";
    currentTask.className = "current-backlog-task";
    currentTask.focus();
    backlog.before(currentTask);
    currentTask.onchange = () => {
        if (currentTask.value !== "") {
            let currentObject = JSON.parse(localStorage.getItem("backlog"));
            let task = document.createElement('div');
            currentObject.issue.push({ id: "task" + currentObject.issue.length, name: currentTask.value });
            localStorage.setItem("backlog", JSON.stringify(currentObject));
            task.className = "task-item";
            task.innerHTML = currentTask.value;
            backlog.before(task);
            currentTask.remove();
        }
    }
};
document.querySelector(".ready-button").addEventListener("click", addItemInReady);
function addItemInReady() {
    if (JSON.parse(localStorage.getItem("backlog")).issue.length > 0) {
        let currentTask = document.createElement("select");
        let ready = document.querySelector(".ready-button");
        console.log(ready);
        currentTask.className = "current-ready-task";
        ready.before(currentTask);

        let currentObject = JSON.parse(localStorage.getItem("backlog"));
        currentTask.append(new Option("choose task:"))
        for (i = 0; i < currentObject.issue.length; i++) {
            currentTask.append(new Option(currentObject.issue[i].name, currentObject.issue[i].id))
        };
        document.querySelector(".current-ready-task").addEventListener("change", changeReady)
    };
};

function changeReady() {
    addTaskFromDropdown(".ready-button", ".current-ready-task", "backlog", "ready", ".body-backlog")
}

function addTaskFromDropdown(currentBody, selectName, previos, current, bodyPrevios) {
    let ready = document.querySelector(currentBody);
    let currentTask = document.querySelector(selectName);
    let index = currentTask.options.selectedIndex - 1;
    let backlogObject = JSON.parse(localStorage.getItem(previos));
    let readyObject = JSON.parse(localStorage.getItem(current));
    let currentObj = Object.assign({}, backlogObject.issue[index]);
    currentObj.id = 'task' + readyObject.issue.length;
    backlogObject.issue.splice(index, 1);
    localStorage.setItem(previos, JSON.stringify(backlogObject));
    readyObject.issue.push(currentObj);
    localStorage.setItem(current, JSON.stringify(readyObject));
    let task = document.createElement('div');
    task.className = "task-item";
    task.innerHTML = currentObj.name;
    ready.before(task);
    currentTask.remove();
    deleteItem(bodyPrevios, index);
}
document.querySelector(".progress-button").addEventListener("click", addItemInProgress);
function addItemInProgress() {
    if (JSON.parse(localStorage.getItem("ready")).issue.length > 0) {
        let currentTask = document.createElement("select");
        let ready = document.querySelector(".progress-button");
        currentTask.className = "current-progress-task";
        ready.before(currentTask);

        let currentObject = JSON.parse(localStorage.getItem("ready"));
        currentTask.append(new Option("choose task:"))
        for (i = 0; i < currentObject.issue.length; i++) {
            currentTask.append(new Option(currentObject.issue[i].name, currentObject.issue[i].id))
        };
        document.querySelector(".current-progress-task").addEventListener("change", changeProgress)
    };
};
function changeProgress() {
    addTaskFromDropdown(".progress-button", ".current-progress-task", "ready", "progress", ".body-ready")
}


document.querySelector(".finished-button").addEventListener("click", addItemInFinished);
function addItemInFinished() {
    if (JSON.parse(localStorage.getItem("progress")).issue.length > 0) {
        let currentTask = document.createElement("select");
        let ready = document.querySelector(".finished-button");
        currentTask.className = "current-finished-task";
        ready.before(currentTask);

        let currentObject = JSON.parse(localStorage.getItem("progress"));
        currentTask.append(new Option("choose task:"))
        for (i = 0; i < currentObject.issue.length; i++) {
            currentTask.append(new Option(currentObject.issue[i].name, currentObject.issue[i].id))
        };
        document.querySelector(".current-finished-task").addEventListener("change", changeFinished)
    };
};
function changeFinished() {
    addTaskFromDropdown(".finished-button", ".current-finished-task", "progress", "finished", ".body-progress")
}
// window.addEventListener("load", initialization)
// function initialization() {
//     let backlog = document.querySelector(".backlog-button");
//     if (JSON.parse(localStorage.getItem("backlog")).issue.length > 0) {
//         let currentObject = JSON.parse(localStorage.getItem("backlog"));
//         for (i = 0; i < currentObject.issue.length; i++) {
//             let task = document.createElement('div');
//             task.className = "task-item";
//             task.innerHTML = currentObject.issue[i];
//             backlog.before(task);
//         }
//     }
// }

function deleteItem(className, index) {
    let backlog = document.querySelector(className);
    backlog.removeChild(document.querySelectorAll(".task-item")[index]);
}