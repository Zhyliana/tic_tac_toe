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
  
  // Array.prototype.all = function(target){
  //   var result = true;
  //   
  //   var arr = this;
  //   for(var i = 0; i < arr.length; i++){
  //     if(arr[i] !== target){
  //       result = false;
  //     }
  //   }
  //   return result;
  // };
  // 
  // Game.prototype.check = function(grid, player){
  //   var result = null;   
  //   var player = player;
  //   
  //   grid.forEach(function(row){
  //     if(row.all(player)){
  //       result = true;
  //     }
  //   });
  //   
  //   return result;
  // };
  // 
  // Game.prototype.horizontalWinner = function(){
  //   return this.check(this.board, this.player);
  // };
  // 
  // Game.prototype.diagonalWinner = function(){
  //   var diagonals = [[this.board[0][0], this.board[1][1], this.board[2][2]],
  //     [this.board[0][2], this.board[1][1], this.board[2][0]]];
  // 
  //     return diagonals.all(this.player);
  // };
  // 
  // 
  // Game.prototype.verticalWinner = function(){
  //   var transposed = [];
  // 
  //   for(var i = 0; i < this.board.length; i ++){
  //     transposed.push([]);
  //     for(var j = 0; j < this.board.length; j ++){
  //       transposed[i][j] = grid[j][i];
  //     }
  //   };
  // 
  //   return this.check(transposed, this.player);
  // };

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

})(this);
