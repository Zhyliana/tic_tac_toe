function Clock () {
  this.time = new Date();
  this.hours = this.time.getHours();
  this.minutes = this.time.getMinutes();
  this.seconds = this.time.getSeconds();
}

Clock.prototype.tick = function(){
  var hours = this.hours;
  var minutes = this.minutes;
  var seconds = this.seconds;

  setInterval(function() {
    console.log(hours + ":" + minutes + ":" + seconds);

    seconds += 5;

    if(seconds >= 60){
      seconds = seconds % 60;
      minutes +=1;
    }

    if(minutes >= 60){
      minutes = minutes % 60;
      hours +=1;
    }

    if(hours >= 24){
      hours = 0;
    }
    }, 5000);
};

Clock.prototype.run = function() {
  this.tick();
}

c = new Clock().run();
