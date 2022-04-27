
class Timer {
    constructor(length,htmlElement) {
        // 1. Take in the length of the timer in minutes and where you want the timer to display
        // 2. Save the seconds as the length * 60
        // 3. Split out the minutes and seconds for timer display
        this.length = length //for the reset of the timer
        this.seconds = length * 60;
        this.minutesShow = Math.floor(this.seconds / 60);
        this.secondsShow = this.seconds % 60
        this.start = false;
        this.htmlElement = htmlElement; //id of the where you want the timer to print
        this.printTime()
      
    }
    
    startTimer() {
      this.timerId = setInterval(this._tick.bind(this), 1000);
      this.start = true;
    }

    pause() {
      clearInterval(this.timerId);
      this.timerId = null;
      this.start = false;
    }

    printTime() {
        // Format the time in MM:SS
        // Use console.log to print it.
        // console.clear();
        // console.log("inside printTime");
        let timeDisplay = document.querySelector(`.${this.htmlElement}`)
        // console.log(
        //   `${this.minutesShow.toString().padStart(2, '0')}:` +
        //   `${(this.secondsShow).toString().padStart(2, '0')}`);
        
        this.minutesShow = Math.floor(this.seconds / 60);
        this.secondsShow = this.seconds % 60;
       
        if (timeDisplay !== null) {
          timeDisplay.innerHTML =`${this.minutesShow.toString().padStart(2, '0')}:` + `${(this.secondsShow).toString().padStart(2, '0')}`;
        }
        
        // console.log(`the seconds remaining are ${this.seconds}`);
        
    }
        
    _tick() {
      if (this.seconds === 0) { 
        this.pause();
        this.resetTimer();

      } else {
        this.seconds -= 1;
        this.time_remaining = this.seconds;

      }
      // console.log("calling printTime()")
      return this.printTime();
      // 1. Decrement the time by one second.
      // 2. Store the number of ticks passed
      // 3. Call printTime.
    }

    resetTimer(){
      this.seconds = (this.length) * 60 + 1;
      
    }
}

// let timer = new Timer(.1);

export default Timer

