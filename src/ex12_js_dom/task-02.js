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
