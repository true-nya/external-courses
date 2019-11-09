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
}))
// localStorage["inProgress"] = {
//     title: "inProgress",
//     issue: []
// }
// localStorage["finished"] = {
//     title: "finished",
//     issue: []
// }

document.querySelector(".backlog-button").addEventListener("click", addItemInBacklog);
function addItemInBacklog() {
    let currentTask = document.createElement("input");
    let backlog = document.querySelector(".backlog-button");
    currentTask.type = "text";
    currentTask.className = "current-backlog-task";
    backlog.before(currentTask);
    currentTask.onchange = () => {
        if (currentTask.value !== "") {
            let currentObject = JSON.parse(localStorage.getItem("backlog"));
            currentObject.issue.push({ id: "task" + currentObject.issue.length, name: currentTask.value });
            localStorage.setItem("backlog", JSON.stringify(currentObject));
            let task = document.createElement('div');
            task.className = "task-item";
            task.innerHTML = currentTask.value;
            backlog.before(task);
            currentTask.remove();
        }
    }
};
let readyButton = document.querySelector(".ready-button");
readyButton.addEventListener("click", addItemInReady);
function addItemInReady() {
    if (JSON.parse(localStorage.getItem("backlog")).issue.length > 0) {
        let currentTask = document.createElement("select");
        let ready = document.querySelector(".body-ready");
        currentTask.className = "current-ready-task";
        ready.before(currentTask);

        let currentObject = JSON.parse(localStorage.getItem("backlog"));
        currentTask.append(new Option("choose task:"))
        for (i = 0; i < currentObject.issue.length; i++) {
            currentTask.append(new Option(currentObject.issue[i].name, currentObject.issue[i].id))
        };



        currentTask.onchange = () => {

            let index;
            let backlogObject = JSON.parse(localStorage.getItem("backlog"));
            console.log(JSON.parse(localStorage.getItem("backlog")).issue);
            index = currentTask.options.selectedIndex - 1;
            console.log(index);
            let readyObject = JSON.parse(localStorage.getItem("ready"));
            let currentObj = Object.assign({}, backlogObject.issue[index]);
            currentObj.id = 'task' + readyObject.issue.length;
            backlogObject.issue.splice(index, 1);
            localStorage.setItem("backlog", JSON.stringify(backlogObject));
            readyObject.issue.push(currentObj);

            let task = document.createElement('div');
            task.className = "task-item";
            task.innerHTML = currentObj.name;
            ready.before(task);
            currentTask.remove();
        };
    };
};

window.addEventListener("load", initialization)
function initialization() {
    let backlog = document.querySelector(".body-backlog");
    if (JSON.parse(localStorage.getItem("backlog")).issue.length > 0) {
        let currentObject = JSON.parse(localStorage.getItem("backlog"));
        for (i = 0; i < currentObject.issue.length; i++) {
            let task = document.createElement('div');
            task.className = "task-item";
            task.innerHTML = currentObject.issue[i];
            backlog.before(task);
        }
    }
}