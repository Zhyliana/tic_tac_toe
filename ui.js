(function (root) {
  var TTT = root.TTT = (root.TTT || {});

  var GameUi = TTT.GameUi = function($rootEl) {
    this.$el = $rootEl;
    this.game = new TTT.Game();
    this.setUpBoard();
    $("#board").on("click", ".empty", this.markBoard.bind(this));
  }

  GameUi.prototype.markBoard = function(event) {
    var $square = $(event.target);
    var pos = $square.data("pos");
    var move = this.game.move(eval(pos))

    $square.toggleClass("empty clicked")
    $square.append("<div class=" + this.game.player + ">" + this.game.player + "</div>");

    if (move !== "next") {
      if (move === "win"){
        $("#board").prepend("<div class=\"modal\">" + this.game.player + " won!<br><br><div id=\"subtitle\">Press any key to start new game</div></div>")
      } else if (move === "tie"){
        $("#board").prepend("<div class=\"modal\">Tie!<br><br><div id=\"subtitle\">Press any key to start new game</div></div>")
      }

      $(".square").toggleClass("empty clicked")
      
      var UI = this;
      $("body").keypress(function(){
        $("#title").text("TicTacToe!")
        $("#subtitle").text("")
        UI.setUpBoard();
        UI.game = new TTT.Game();
      });
    };
    
  };

  GameUi.prototype.setUpBoard = function() {
    var boardString = "";
       
    for(var r = 0; r < 3; r++){
      for(var c = 0; c < 3; c++){
        boardString += "<div class=\"square empty\" data-pos=[" + r + "," + c +"]></div>";
      }
    };
    
    this.$el.html(boardString);
  };

  GameUi.prototype.setUpEvents = function () {
    this.game.run();
  };

})(this);