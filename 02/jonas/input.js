const fs = require("fs");

const input = fs
  .readFileSync(`${__dirname}/input.txt`)
  .toString()
  .trim();

module.exports = input.split(`,`).map(str => Number(str));
