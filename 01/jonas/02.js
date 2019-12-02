const nums = require(`./input`);

const calcFuel = mass => {
  const fuelMass = Math.floor(mass / 3) - 2;

  if (fuelMass <= 0) {
    return 0;
  } else {
    return fuelMass + calcFuel(fuelMass);
  }
};

const res = nums.map(calcFuel).reduce((a, b) => a + b, 0);

console.log(res);
