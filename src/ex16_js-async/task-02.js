function debounce(currentFunc, delay) {
    let debounceValue;
    return function () {
        clearInterval(debounceValue);
        let args = arguments;
        debounceValue = setTimeout(() => currentFunc.apply(this, args), delay);
    }
}
const menu = [
    {
        name: "Салат 'Оливье'",
        description: "200 г",
        cost: '300'
    },
    {
        name: "Салат овощной 'Греческий'",
        description: "Свежие огурцы, болгарский перец, помидоры, маслины, оливки, сыр Фета, красный лук, Запрвляется соусом 'бальзамик' 250 г.",
        cost: '390'
    },
    {
        name: "Спагетти Карбонара",
        description: "Спагетти с беконом, яйцом, сливочным соусом и сыром Пармезан 260 г.",
        cost: '560'
    },
    {
        name: "Стейк из тунца в кунжуте",
        description: "Подается с овощным салатом из свежего огурца, томатов, стручковой фасоли и листьями салата Романо 170/120 г.",
        cost: '700'
    },
    {
        name: "Котлеты куриные с картофельным пюре",
        description: "Подаются с соусом Тар Тар 180/150/40 г.",
        cost: '220'

    },
    {
        name: "Мороженое",
        description: "Ванильное, Клубничное, Шоколадное, Фисташковое 1 шарик / 50 г.",
        cost: '110'
    },
];
headTable = ["Наименование", "Описание", "Цена, руб"]
function addTable(menu) {
    if (document.querySelector(".table")) {
        document.querySelector(".table").remove();
        console.log("delete");
    }
    let table = document.createElement("table");
    table.className = "table";
    document.querySelector(".main-information").append(table)
    const caption = document.createElement('caption');
    caption.innerHTML = "Меню";
    table.append(caption);
    const rowHead = document.createElement('tr');
    for (let i = 0; i < headTable.length; i++) {
        const head = document.createElement('th');
        head.innerText = headTable[i];
        rowHead.append(head);
    }
    table.append(rowHead)
    for (let i = 0; i < menu.length; i++) {
        const row = document.createElement('tr');
        table.append(row);
        for (const key in menu[i]) {
            if (menu[i].hasOwnProperty(key)) {
                const td = document.createElement('td');
                td.innerText = menu[i][key];
                row.append(td);
            }
        }
    }
}
addTable(menu);
const input = document.querySelector(".input");
input.oninput = debounce(function () {
    addTable(menu.filter(item => {
        if (input.value !== "") {
            return item.cost === input.value
        }
        return item.cost
    }
    ));
}, 1000);

