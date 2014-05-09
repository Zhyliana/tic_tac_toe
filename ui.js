(function (root) {
  var TTT = root.TTT = (root.TTT || {});


  var GameUi = TTT.GameUi = function($rootEl) {
    this.$el = $rootEl;
    this.game = new TTT.Game();
    this.setUpBoard();
    $("#board").on("click", ".unclicked-square", this.markBoard.bind(this));
  }

  GameUi.prototype.markBoard = function(event) {
    var $square = $(event.target);
    var pos = $square.attr("id");

    $square.removeClass('unclicked-square')
    $square.addClass('clicked-square')
    $square.append("<div class=" + this.game.player + ">" + this.game.player + "</div>");
    
    if (this.game.move(eval(pos))) {
      alert("You won!")
      this.setUpBoard();
      this.game = new TTT.Game();
    };
  }

  GameUi.prototype.setUpBoard = function() {
    var boardString = "";
       
    for(var r = 0; r < 3; r++){
      for(var c = 0; c < 3; c++){
        boardString += "<div class='square unclicked-square' id=[" + r + ","+ c +"]></div>";
      }
    };
    
    this.$el.html(boardString);
  };

  GameUi.prototype.setUpEvents = function () {
    this.game.run();
    this.$el.click('.square', markBoard(this));
  };

})(this);