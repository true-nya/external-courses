function debounce(currentFunc, delay) {
    let debounceValue;
    return function () {
        clearInterval(debounceValue);
        debounceValue = setTimeout(() => currentFunc.apply(this, arguments), delay);
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
    }
    let table = document.createElement("table");
    table.classList.add("table");
    document.querySelector(".main-information").append(table)
    const caption = document.createElement('caption');
    caption.innerHTML = "Меню";
    table.append(caption);
    const rowHead = document.createElement('tr');
    headTable.forEach((item) => {
        const head = document.createElement('th');
        head.innerText = item;
        rowHead.append(head);
    });
    table.append(rowHead)
    menu.forEach(item => {
        const row = document.createElement('tr');
        table.append(row);
        for (const key in item) {
            if (Object.keys(item).includes(key)) {
                const data = document.createElement('td');
                data.innerText = item[key];
                row.append(data);
            }
        }
    });
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

