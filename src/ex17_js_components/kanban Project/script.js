import { createSubMenu } from "./src/utils/createMenu.js"
import { createDropDown, addTaskFromDropdown, addItemInBacklog, initialization } from "./src/utils/taskUtils.js"

const userMenu = document.querySelector(".user-menu");
userMenu.addEventListener("click", createSubMenu)
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

document.querySelector(".backlog-button").addEventListener("click", addItemInBacklog);
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

