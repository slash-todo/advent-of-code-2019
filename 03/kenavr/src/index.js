const { WireUtils, FsUtils } = require('./utils');
const { Wire } = require('./models');
const { PartOne, PartTwo } = require('./parts');

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
  
  const two = new PartTwo(wireOne, wireTwo);
  console.log(
    '2) The fewest steps to closest intersection: ',
    two.calcFewestSteps(intersections)
  );
}

module.exports = run;


