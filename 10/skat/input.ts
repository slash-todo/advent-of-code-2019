import fs = require('fs');

const input: string = fs
    .readFileSync(`${__dirname}/input.txt`)
    .toString()
    .trim();

export default input.split('\n').map(row => row.split(''));

// thanks to jgierer12 on github for this handy solution
