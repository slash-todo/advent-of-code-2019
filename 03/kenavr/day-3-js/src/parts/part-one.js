const { Point } = require('../models');

function PartOne(wireOne, wireTwo) {
  this.wireOne = wireOne;
  this.wireTwo = wireTwo;

  function calcDistances(intersections) {
    const startPoint = new Point(0, 0);

    return intersections.map(p => {
      return new Point(
        Math.abs(p.x) - startPoint.x,
        Math.abs(p.y) - startPoint.y
      );
    });
  }

  function calcManhattanDistances(distances) {
    return distances.map(p => p.x + p.y);
  }

  function findShortest(distances) {
    return distances.sort((d1, d2) => d1 - d2)[0];
  }

  this.calcShortestManhattan = function calcShortestManhattan(intersections) {
    const distances = calcDistances(intersections);
    const manhattan = calcManhattanDistances(distances);
    return findShortest(manhattan);
  };
}

module.exports = PartOne;
