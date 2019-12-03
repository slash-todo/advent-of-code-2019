const { WireUtils, FsUtils } = require('./utils');
const { Wire } = require('./models');
const { PartOne } = require('./parts');

function run() {
  const lines = FsUtils.loadAndParseInputFile(`${__dirname}/../input.txt`);
  const wireOne = new Wire(lines[0]);
  const wireTwo = new Wire(lines[1]);
  
  const intersections = WireUtils.getIntersectionPoints(wireOne, wireTwo);
  
  const one = new PartOne(wireOne, wireTwo);
  console.log(
    '1) The shortest manhattan distance is: ',
    one.calcShortestManhattan(intersections)
  );
}

module.exports = run;


