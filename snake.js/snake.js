(function () {
  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }


  var Snake = SnakeGame.Snake = function(){
    this.dir = new Coord([1,0]);
    this.segments = [new Coord([0,0]), new Coord([0,1])];
  }

  Snake.DIRS = ["N", "E", "W", "S"];

  Snake.prototype.move = function () {
    this.segments.push(this.segments[this.segments.length-1].plus(this.dir));
    this.segments.shift();
  };

  Snake.prototype.turn = function (dir) {
    switch (dir){
    case "N":
      this.dir = new Coord([-1,0]);
      break;
    case "E":
      this.dir = new Coord([0,1]);
      break;
    case "W":
      this.dir = new Coord([0,-1]);
      break;
    case "S":
      this.dir = new Coord([1,0]);
      break;
    }
  };

  Snake.prototype.selfImpacted = function () {
    console.log("mah lenght", this.segments.length);
    console.log("whatever", this.segments.uniq().length);
    return (this.segments.length > this.segments.uniq().length);
  };

  Array.prototype.uniq = function () {
    var uniqueArray = [];

    for (var i = 0; i < this.length; i++) {
      if (uniqueArray.indexOf(this[i]) === -1) {
        uniqueArray.push(this[i]);
      }
    }

    return uniqueArray;
  };

  var Coord = SnakeGame.Coord = function (pos) {
    this.pos = pos;
  }

  Coord.prototype.x = function () {
    return this.pos[1];
  };

  Coord.prototype.y = function () {
    return this.pos[0];
  };

  Coord.prototype.plus = function (coord2) {
    var newX = this.x() + coord2.x();
    var newY = this.y() + coord2.y();
    return new Coord([newY, newX]);
  };

  Coord.prototype.plusEqual = function (coord2) {
    this.pos = this.plus(coord2);
  };

  var Board = SnakeGame.Board = function() {
    this.snake = new Snake();
    this.initializeGrid();
  };

  Board.prototype.initializeGrid = function () {
    this.grid = new Array(50);
    for(var i = 0; i < this.grid.length; i++) {
      this.grid[i] = new Array(this.grid.length);
    };
  };

  Board.prototype.render = function () {
    console.log(this.grid.join);
  };

  Board.prototype.lost = function () {
    console.log('oob:', this.isOutOfBounds());
    console.log('impact:', this.snake.selfImpacted());
    return (this.isOutOfBounds() || this.snake.selfImpacted());
  };

  Board.prototype.isOutOfBounds = function () {
    var tooFarRight = this.snake.segments[this.snake.segments.length - 1].x() > this.grid.length;
    var tooFarDown = this.snake.segments[this.snake.segments.length - 1].y() > this.grid.length;
    var tooFarLeft = this.snake.segments[this.snake.segments.length - 1].x() < 0;
    var tooFarUp = this.snake.segments[this.snake.segments.length - 1].y() < 0;
    console.log('oob');
    return tooFarRight || tooFarDown || tooFarLeft || tooFarUp;
  };

})();