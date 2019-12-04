const Orientation = require("./orientation");

function Line(source, destination) {
  this.source = source;
  this.destination = destination;

  this.orientation = () => {
    if (source.x === destination.x) {
      return Orientation.HORIZONTAL;
    }

    if (source.y === destination.y) {
      return Orientation.VERTICAL;
    }

    return null;
  };
}

module.exports = Line;
