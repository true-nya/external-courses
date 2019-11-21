function Appliance(name, price, isTurnOn, power) {
    this.name = name;
    this.price = price;
    this.isTurnOn = isTurnOn;
    this.power = power;
}
Appliance.prototype.enabled = function () {
    this.isTurnOn = true;
};
Appliance.prototype.disabled = function () {
    this.isTurnOn = false;
};
function Room(nameRoom) {
    this.nameRoom = nameRoom;
    this.devices = Array.from(arguments).slice(1);
}

Room.prototype.searchDeviceByName = function (name) {
    for (let i = 0; i < this.devices.length; i++) {
        if (this.devices[i].name.toLowerCase() === name.toLowerCase()) {
            return this.devices[i];
        }
    }
    return "not found";
};
Room.prototype.calculatePower = function () {
    let powerSum = 0;
    for (let i = 0; i < this.devices.length; i++) {
        if (this.devices[i].isTurnOn) {
            powerSum += this.devices[i].power;
        }
    }
    return powerSum + " mW";
};

const laptop = new Appliance("laptop", 36000, true, 2);
const airConditioning = new Appliance("air conditioning", 10000, false, 2.1);
const tv = new Appliance("TV", 10000, true, 2.1);
const myRoom = new Room("living room", laptop, airConditioning, tv);
console.log(myRoom.calculatePower());
console.log(myRoom.searchDeviceByName("laptop"));