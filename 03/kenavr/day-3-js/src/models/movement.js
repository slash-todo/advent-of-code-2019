const Direction = {
  RIGHT: 'right',
  LEFT: 'left',
  UP: 'up',
  DOWN: 'down'
};

function Movement(direction, steps) {
  this.direction = direction;
  this.steps = steps;
}

module.exports = {
  Direction,
  Movement
};
