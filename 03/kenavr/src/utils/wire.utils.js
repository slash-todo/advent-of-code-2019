const { Orientation, Point, Line } = require('../models');

function getIntersectionPoints(wireOne, wireTwo) {
  function intersection(line1, line2) {
    function between(value, sourceVal, destVal) {
      if (sourceVal < destVal) {
        return sourceVal < value && value < destVal;
      }

      if (sourceVal > destVal) {
        return destVal < value && value < sourceVal;
      }

      return value === sourceVal;
    }

    function doIntersect() {
      const orientation1 = line1.orientation();

      if (orientation1 === Orientation.HORIZONTAL) {
        return (
          between(line1.source.x, line2.source.x, line2.destination.x) &&
          between(line2.source.y, line1.source.y, line1.destination.y)
        );
      } else {
        return (
          between(line1.source.y, line2.source.y, line2.destination.y) &&
          between(line2.source.x, line1.source.x, line1.destination.x)
        );
      }
    }

    function calcIntersectionPoint() {
      const orientation1 = line1.orientation();

      if (orientation1 === Orientation.HORIZONTAL) {
        return new Point(line1.source.x, line2.source.y);
      } else {
        return new Point(line2.source.x, line1.source.y);
      }
    }

    if (doIntersect()) {
      return calcIntersectionPoint();
    }

    return false;
  }

  function findIntersections(points1, points2) {
    let line1;
    let line2;

    return points1
      .map((p1, idx1) =>
        points2.map((p2, idx2) => {
          if (idx1 >= points1.length - 1 || idx2 >= points2.length - 1)
            return false;
          line1 = new Line(p1, points1[idx1 + 1]);
          line2 = new Line(p2, points2[idx2 + 1]);

          return intersection(line1, line2);
        })
      )
      .map(i => i.filter(v => v));
  }

  const intersections = findIntersections(
    wireOne.getPoints(),
    wireTwo.getPoints()
  );
  return [].concat.apply([], intersections);
}

module.exports = {
  getIntersectionPoints
};
