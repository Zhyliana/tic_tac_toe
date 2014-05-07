var readline = require('readline');
var READER = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function addNumbers(sum, numsLeft, completionCallback){
  if(numsLeft > 0){
    READER.question("What is your number?", function(number){
      var num = parseInt(number);
      numsLeft -= 1;
      sum += num;
      console.log(sum);
      addNumbers(sum, numsLeft, completionCallback);
    });
  } else {
    completionCallback(sum);
  };
};

addNumbers(0, 3, function (sum) {
  console.log("Total Sum: " + sum);
});