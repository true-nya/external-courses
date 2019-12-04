export function createSubMenu() {
    let userSubmenu = document.querySelector(".user-submenu");
    const arrow = document.querySelector(".arrow");
    if (!userSubmenu) {
        userSubmenu = document.createElement("ul");
        arrow.classList.add("reflected-arrow");
        userSubmenu.classList.add("user-submenu");
        userMenu.append(userSubmenu);
        userSubmenu.insertAdjacentHTML("beforeend", "<li><a href = '#'>My account</a></li><li><a href = '#'>My task</a></li> <li><a href = '#'>Log out</a></li>");
    } else {
        arrow.classList.remove("reflected-arrow");
        userSubmenu.remove();
    }
}