const Point = require('./point');
const { Movement, Direction } = require('./movement');

function Wire(movements, points = []) {
  this.movements = movements.map(toMovement);
  this.points = points;

  function toMovement(movement) {
    const direction = movement.charAt(0);
    const distance = parseInt(movement.substring(1));

    switch (direction) {
      case 'R':
        return new Movement(Direction.RIGHT, distance);
      case 'L':
        return new Movement(Direction.LEFT, distance);
      case 'U':
        return new Movement(Direction.UP, distance);
      case 'D':
        return new Movement(Direction.DOWN, distance);
      default:
        break;
    }
  }

  function applyMovement(movement, lastPoint) {
    const point = new Point(lastPoint.x, lastPoint.y);

    switch (movement.direction) {
      case Direction.RIGHT:
        point.x += movement.steps;
        break;
      case Direction.LEFT:
        point.x -= movement.steps;
        break;
      case Direction.UP:
        point.y += movement.steps;
        break;
      case Direction.DOWN:
        point.y -= movement.steps;
        break;
      default:
        break;
    }

    return point;
  }

  function calcPoints() {
    this.movements.forEach((m, idx) => {
      const lastPoint =
        idx === 0 ? new Point(0, 0) : this.points[this.points.length - 1];
      this.points.push(applyMovement(m, lastPoint));
    });
  }

  this.getPoints = function getPoints() {
    if (points.length === 0) {
      calcPoints.call(this);
    }

    return this.points;
  };
}

module.exports = Wire;
