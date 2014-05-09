(function (root) {
  // var readline = require('readline');
 //  var reader = readline.createInterface({
 //    input: process.stdin,
 //    output: process.stdout
 //  });

  var TicTacToe = root.TicTacToe = (root.TicTacToe || {});
  var Board = TicTacToe.Board = function(){
    this.grid = [["_","_","_"],["_","_","_"], ["_","_","_"]]
    this.empty = function(pos){
      if(this.grid[pos[0]][pos[1]] === "_"){
        return true;
      }
      else {
        return false;
      }
    };

    this.won = function() {
      if(check("x", this.grid)){
        return "x won!";
      }
      else if (check("o", this.grid)){
        return "o won!";
      }
      else{
        return false;
      }
    };

    this.display = function(){
      console.log(this.grid[0] + "\n" + this.grid[1] + "\n" + this.grid[2]);
    };

    this.gameOver = function(){
      var flattened = this.grid[0].concat(this.grid[1]).concat(this.grid[2])

      if(this.won() === "x won!" || this.won() === "o won!" || flattened.all(/[^_]/)){
        return true;
      }
      else {
        return false;
      }
    };

    this.markPlace = function(mark, pos){
      if(this.empty(pos)){
        this.grid[pos[0]][pos[1]] = mark;
      }
    };

    var check = function(player, grid){
      if(checkRow(player, grid) || checkColumns(player, grid) || checkDiagonals(player, grid) ){
        return true;
      }
      else {
        return false;
      }
    };

    Array.prototype.all = function(target){
      var result = true;
      for(var i = 0; i < this.length; i++){
        if(this[i] !== target){
          result = false;
        }
      }
      return result;
    };

    var checkRow = function(player, grid){
      var result = false
      grid.forEach(function(row){
        if(row.all(player)){
          result = true;
        }
      });
      return result;
    };

    var checkDiagonals = function(player, grid){
      var diagonals = [[grid[0][0], grid[1][1], grid[2][2]],
        [grid[0][2], grid[1][1], grid[2][0]]];

        return checkRow(player, diagonals);
    };


    var checkColumns = function(player, grid){
      var transposed = [];

      for(var i = 0; i < grid.length; i ++){
        transposed.push([]);
        for(var j = 0; j < grid.length; j ++){
          transposed[i][j] = grid[j][i];
        }
      };

      return checkRow(player, transposed);
    };


  }

  var Game  = TicTacToe.Game = function(player1, player2){
    this.board = new TicTacToe.Board();
    this.playerO = player1;
    this.playerX = player2;

    this.play = function(player){

      this.board.display();
      var game = this
      player.getMove(function(pos){
        game.board.markPlace(playerMark(player), pos);
        if(game.board.gameOver()){
          if(game.board.won()){
            console.log(game.board.won());
          }
          else {
            console.log("Tie!");
          }
        }
        else {
          var nextPlayer;
          if(player === game.playerO){
            nextPlayer = game.playerX;
          }
          else {
            nextPlayer = game.playerO;
          };
          game.play(nextPlayer);
        }
      });

    };

    var playerMark = function(player){
      if(player.name === "Os"){
        return "o";
      }
      else {
        return "x";
      };
    };
  }

  var HumanPlayer = TicTacToe.HumanPlayer = function(name){
    var player = this;
    this.name = name;
    this.getMove = function(callback){
      reader.question("Where do you want to place your mark?", function(pos){
        var pos = pos.split(",")
        callback(pos);
      });
    };

  };
})(this);


var p1 = new this.TicTacToe.HumanPlayer("Os");
var p2 = new this.TicTacToe.HumanPlayer("Xs");
var g = new this.TicTacToe.Game(p1, p2);
g.play(p1);
