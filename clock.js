function Clock () {
  this.time = new Date();
  this.hours = this.time.getHours();
  this.minutes = this.time.getMinutes();
  this.seconds = this.time.getSeconds();
}

Clock.prototype.tick = function(){
  this.seconds += 5;

  if(this.seconds >= 60){
    this.seconds -= 60;
    this.minutes +=1;
  }

  if(this.minutes >= 60){
    this.minutes -= 60;
    this.hours +=1;
  }

  if(this.hours >= 24){
    this.hours -= 24;
  }
  console.log(this.hours + ":" + this.minutes + ":" + this.seconds);
};

Clock.prototype.run = function() {
  var clock = this;
  setInterval(clock.tick.bind(this), 5000)
}

c = new Clock().run();
