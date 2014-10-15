(function(){
  if(typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var View = SnakeGame.View = function($el) {
    this.board = new SnakeGame.Board();
    this.el = $el;
    this.bindEvents();
    this.setUpBoard();
    this.stepIntervalId = setInterval(this.step.bind(this), 2000);

  }

  View.prototype.bindEvents = function () {
    var that = this;

    $(window).on('keydown', function(event){
      var dir = that.parseKeyCode(event.keyCode);
      if (dir) {
        that.board.snake.turn(dir);
      }
    });
  };

  View.prototype.parseKeyCode = function (keycode) {
    switch (keycode) {
    case 38:
      return "N";
      break;
    case 37:
      return "W";
      break;
    case 39:
      return "E";
      break;
    case 40:
      return "S";
      break;
    default:
      return null;
    }
  };

  View.prototype.step = function () {
    this.board.snake.move();
    this.render();
    if (this.board.lost()) {
      alert("you lose good day sir");
      clearInterval(this.stepIntervalId);
    }
  };

  View.prototype.render = function () {
    var $listItem = $('li');
    $listItem.removeClass();

    this.board.snake.segments.forEach(function (segment) {
      $("ul.col:nth-child(" + (segment.x() + 1) + ") li:nth-child(" + (segment.y() + 1) + ")").addClass('snake');
    })

  };

  View.prototype.setUpBoard = function () {
    for (var i = 0; i < 50; i++) {

      this.el.append("<ul class='col'>");
      for (var j = 0; j < 50; j++) {
        $('ul:last').append("<li></li>");
      }
    }

  };
})();

