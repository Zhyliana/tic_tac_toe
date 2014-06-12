(function (root) {
  var TTT = root.TTT = (root.TTT || {});

  var Game = TTT.Game = function TT() {
    this.player = Game.marks[0];
    this.board = this.makeBoard();
  }

  Game.marks = ["X", "O"];
  
  Game.prototype.makeBoard = function () {
    return _.times(3, function (i) {
      return _.times(3, function (j) {
        return null;
      });
    });
  };

  Game.prototype.diagonalWin = function(){
    var game = this;
    var diagonal1 = [[0, 0], [1, 1], [2, 2]];
    var diagonal2 = [[2, 0], [1, 1], [0, 2]];
    var winner = null;
    
    _(Game.marks).each(function (mark){
      function diagonalWinTest (diagonals){
        return _.every(diagonals, function(pos){
          return game.board[pos[0]][pos[1]] === mark;
        });
      }
      
      var won = _.any(
        [diagonal1, diagonal2],
        diagonalWinTest
      );
      
      if (won) {
        winner = mark;
      }
    });
    
    return winner;    
  };
  
  
  Game.prototype.horizontalWin = function(){
    var game = this;
    var winner = null;
    
    _(Game.marks).each(function (mark){
      var validIdx = _.range(0, 3);
    
      var won = _(validIdx).any(function(i){
        return _(validIdx).every(function(j){
          return game.board[i][j] === mark
        });
      });
      
      if (won) {
        winner = mark;
      }      
    });
    
    return winner;
  };
  
  Game.prototype.verticalWin = function () {
    var game = this;

    var winner = null;
    _(Game.marks).each(function (mark) {
      var validIdx = _.range(0, 3);
    
      var won = _(validIdx).any(function(i){
        return _(validIdx).every(function(j){
          return game.board[j][i] === mark
        });
      });
      
      if (won) {
        winner = mark;
      }
    });

    return winner;
  };

  Game.prototype.placeMark = function (pos) {
    this.board[pos[0]][pos[1]] = this.player;
  };

  Game.prototype.switchPlayer = function () {
    if (this.player === Game.marks[0]) {
      this.player = Game.marks[1];
    } else {
      this.player = Game.marks[0];
    }
  };
  
  Game.prototype.move = function (pos) {
    if(this.isEmptyPos(pos)){
      this.placeMark(pos);
      this.switchPlayer();
    };
    
    if (this.winner()) {
      return "win"
    } else if (this.tie()) {
      return "tie"
    } else {
      return "next"
    };
  };

  Game.prototype.winner = function(){
    return (
      this.horizontalWin() || this.verticalWin() || this.diagonalWin() 
    )
  };
  
  Game.prototype.isEmptyPos = function (pos) {
   return (this.board[pos[0]][pos[1]] === null);
  };
   
  Game.prototype.tie = function(){
    var game = this;
    var board = this.board;
    var game_over = true;
    
    [0, 1, 2].forEach(function(x){
      [0, 1, 2].forEach(function(y){
        if (game.isEmptyPos([x,y])){
          return game_over = false
        }
      })
    })
    
    return game_over
  };

})(this);
