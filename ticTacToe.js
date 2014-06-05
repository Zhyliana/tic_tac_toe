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

  Game.prototype.diagonalWinner = function () {
    var game = this;
  
    var diagonalPositions1 = [[0, 0], [1, 1], [2, 2]];
    var diagonalPositions2 = [[2, 0], [1, 1], [0, 2]];
  
    var winner = null;
    _(Game.marks).each(function (mark) {
      function didWinDiagonal (diagonalPositions) {
        return _.every(diagonalPositions, function (pos) {
          return game.board[pos[0]][pos[1]] === mark;
        });
      }
  
      var won = _.any(
        [diagonalPositions1, diagonalPositions2],
        didWinDiagonal
      );
  
      if (won) {
        winner = mark;
      }
    });
  
    return winner;
  };
  
  
  Game.prototype.horizontalWinner = function () {
    var game = this;
  
    var winner = null;
    _(Game.marks).each(function (mark) {
      var indices = _.range(0, 3);
  
      var won = _(indices).any(function (i) {
        return _(indices).every(function (j) {
          return game.board[i][j] === mark;
        });
      });
  
      if (won) {
        winner = mark;
      }
    });
  
    return winner;
  };
  
  Game.prototype.verticalWinner = function () {
    var game = this;
  
    var winner = null;
    _(Game.marks).each(function (mark) {
      var indices = _.range(0, 3);
  
      var won = _(indices).any(function (j) {
        return _(indices).every(function (i) {
          return game.board[i][j] === mark;
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
    this.placeMark(pos);

    if (this.winner()) {
      return true
    } else {
      this.switchPlayer();
    };
  };

  Game.prototype.winner = function () {
    return (
      this.diagonalWinner() || 
      this.horizontalWinner() || 
      this.verticalWinner()
    );
  };
  
  Game.prototype.isEmptyPos = function (pos) {
   return (this.board[pos[0]][pos[1]] === null);
  };
   
  Game.prototype.tie = function(){
    var board = this.board;
    var game = this;
    var game_over = false;
    
    [0, 1, 2].forEach(function(x){
      [0, 1, 2].forEach(function(y){
        if (game.isEmptyPos([x,y])){
          return game_over = true
        }
      })
    })
    
    return game_over
  };

})(this);
