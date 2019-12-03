const { Direction } = require('../models');

function IntersectionSteps(intersection, steps) {
  this.intersection = intersection;
  this.steps = steps;
}

function PartTwo(wireOne, wireTwo) {
  this.wireOne = wireOne;
  this.wireTwo = wireTwo;

  function evaluateIntersectionSteps(wire, intersections) {
    let intersectionCounter = intersections.map(
      i => new IntersectionSteps(i, -1)
    );

    function connectedIntersections(point, movement, stepsSoFar) {
      function getStepsForDirection(point, movement, intersection) {
        const calculations = {
          [Direction.UP]: () =>
            stepsSoFar + (intersection.y - (point.y - movement.steps)),

          [Direction.DOWN]: () =>
            stepsSoFar + (movement.steps - (intersection.y - point.y)),

          [Direction.LEFT]: () =>
            stepsSoFar + (movement.steps - (intersection.x - point.x)),

          [Direction.RIGHT]: () =>
            stepsSoFar + (intersection.x - (point.x - movement.steps))
        };

        return calculations[movement.direction]();
      }

      function intersects(point, movement, intersection) {
        const predicates = {
          [Direction.UP]: () =>
            point.y - movement.steps < intersection.y &&
            intersection.y < point.y &&
            intersection.x === point.x,

          [Direction.DOWN]: () =>
            point.y < intersection.y &&
            intersection.y < point.y + movement.steps &&
            intersection.x === point.x,

          [Direction.LEFT]: () =>
            point.x < intersection.x &&
            intersection.x < point.x + movement.steps &&
            intersection.y === point.y,

          [Direction.RIGHT]: () =>
            point.x - movement.steps < intersection.x &&
            intersection.x < point.x &&
            intersection.y === point.y
        };

        return predicates[movement.direction]();
      }

      intersectionCounter = intersectionCounter.map(ic => {
        if (ic.steps !== -1) {
          return ic;
        }

        if (intersects(point, movement, ic.intersection)) {
          ic.steps = getStepsForDirection(point, movement, ic.intersection);
        }

        return ic;
      });
    }

    let steps = 0;
    wire.points.forEach((p, idx) => {
      connectedIntersections.call(this, p, wire.movements[idx], steps);
      steps += wire.movements[idx].steps;
    });

    return intersectionCounter;
  }

  this.calcFewestSteps = function calcFewestSteps(intersections) {
    const wireOneCounter = evaluateIntersectionSteps(
      this.wireOne,
      intersections
    );
    const wireTwoCounter = evaluateIntersectionSteps(
      this.wireTwo,
      intersections
    );

    return wireOneCounter
      .map((c, idx) => c.steps + wireTwoCounter[idx].steps)
      .sort((a, b) => a - b)[0];
  };
}

module.exports = PartTwo;
