const inputs = require('./input.js');

const getFuelRequirement = mass => {
    let total = 0;
    let fuel = mass;
    while (fuel > 0) {
        fuel = Math.floor(fuel / 3) - 2;
        if (fuel > 0) {
            total = total + fuel;
        }
    }
    return total;
};

const answer = inputs.map(getFuelRequirement).reduce((acc, val) => acc + val);

console.log(answer);
