class Calculator {
    constructor() {
        this.currentValue = 0;
    }
    add(num = 0) {
        this.currentValue += num;
        return this;
    }
    subtract(num = 0) {
        this.currentValue -= num;
        return this;
    }
    divide(num = 1) {
        if (num !== 0) {
            this.currentValue /= num;
        }
        return this;
    }
    multiply(num = 1) {
        this.currentValue *= num;
        return this;
    }
    getResult() {
        return this.currentValue;
    }
    setState(state) {
        if (state) {
            this.currentValue = state;
        }
        return this;
    }
    reset() {
        this.currentValue = 0;
        return this;
    }
    fetchData(callback) {
        this.currentValue = 500;
        setTimeout(callback, 1000, this.currentValue);
        return this;
    }
}
module.exports = new Calculator();