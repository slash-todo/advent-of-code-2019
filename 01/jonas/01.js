const nums = require("./input");

const res = nums.map(a => Math.floor(a / 3) - 2).reduce((a, b) => a + b, 0);

console.log(res);
