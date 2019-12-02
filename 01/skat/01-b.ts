const inputs = require('./input.ts');

const getFuelRequirement = (mass: number): number => {
    let total: number = 0;
    let fuel: number = mass;
    while (fuel > 0) {
        fuel = Math.floor(fuel / 3) - 2;
        if (fuel > 0) {
            total = total + fuel;
        }
    }
    return total;
};

const answer = inputs
    .map(getFuelRequirement)
    .reduce((acc: number, val: number) => acc + val);

console.log(answer);
