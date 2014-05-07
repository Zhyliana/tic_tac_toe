Function.prototype.myBind = function(obj){
  this.apply(obj);
};

function Cat(name){
  this.name = name
};

function meow (){
  console.log("meow");
};

c = new Cat("Undefined");

meow.myBind(c);