class Food {
    constructor(name, weight, cost) {
        this.name = name;
        this.weight = weight;
        this.cost = cost;
    }
}
class Candy extends Food {
    constructor(filling, amountSugar, calorificValue, name, weight, cost) {
        super(name, weight, cost);
        this.filling = filling;
        this.amountSugar = amountSugar;
        this.calorificValue = calorificValue;
    }
}
class childGift {
    constructor() {
        this.candies = Array.from(arguments);
    }
    set Candies(candy) {
        this.candies.push(candy);
    }
    get Candies() {
        return this.candies;
    }
    getWeight() {
        let weightGift = 0;
        for (let i = 0; i < this.candies.length; i++) {
            weightGift += this.candies[i].weight;
        }
        return "Вес подарка: " + weightGift + " г";
    }
    searchByName(value) {
        for (let i = 0; i < this.candies.length; i++) {
            if (this.candies[i].name.toLowerCase() === value.toLowerCase()) {
                return this.candies[i];
            }
        }
        return "Not found";
    }
    sortByCost() {
        return this.candies.sort((firstItem, secondItem) => {
            return firstItem.cost - secondItem.cost;
        });
    }
}

const lollipop = new Candy("jam", "100%", 200, "Chupachups", 30, 40);
const bisquit = new Candy("chocolate", "50%", 250, "Jack", 60, 50);
const waffle = new Candy("cream", "60%", 150, "Cow", 30, 20);
const newYearGift = new childGift(lollipop, bisquit, waffle);

console.log(newYearGift.sortByCost());
console.log(newYearGift.getWeight());
console.log(newYearGift.searchByName("Chupachups"));