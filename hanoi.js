(function (root) {
  var readline = require('readline');
  var reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  var Hanoi = root.Hanoi = (root.Hanoi || {});
  var Game = Hanoi.Game = function(){
    this.stacks = [[1,2,3], [], []];

    var stacks = this.stacks;

    this.makeMove = function(disc, stack){
      if(stacks[stack].length === 0 || stacks[stack][0] > stacks[disc][0]){
        var disc =  stacks[disc].shift(0);
        stacks[stack].unshift(disc);
      }
      else{
        console.log("Invalid move");
      }

      if (this.gameOver()){
        console.log("You won!")
      }
      else{
        this.play();
      }
    };

    this.getMove = function(){
      var game = this;
      reader.question("From what stack would you like to move the top disc", function(from_stack){
        reader.question("To what stack would you like to move this disc", function(to_stack){
          var disc = parseInt(from_stack);
          var stack = parseInt(to_stack);
          console.log(stack);
          
          if (stacks[disc].length === 0 ){
            console.log("No disc to move");
            game.play();
          } else {
            game.makeMove(disc, stack);
          }
        });
      });
    };

    this.gameOver = function(){
      if(stacks[2].length === 3){
        return true;
      } else {
        return false;
      }
    };

    this.display = function(){
      console.log(this.stacks);
    };

    this.play = function(){
      this.display();
      this.getMove(this.makeMove);
    };
  }
})(this);


var g = new this.Hanoi.Game();
g.play();