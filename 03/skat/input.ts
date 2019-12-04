import fs = require('fs');

const textFile: string = fs
    .readFileSync(`${__dirname}/input.txt`)
    .toString()
    .trim();

const inputs: string[] = textFile.split(`\n`);

export default inputs.map((input: string): string[] => input.split(`,`));

// thanks to jgierer12 on github for this handy solution
