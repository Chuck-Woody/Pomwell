import * as THREE from 'three'
import { Scene } from 'three';
// import {Howl, Howler} from 'howler';
import Timer from "./timer.js"


// let scene1 = new Scene()
// console.log(scene1)



//Set the display timer to the 25 minute sprint timer

let sprintTimer = new Timer(25, 'timer-value');
sprintTimer.printTime();

//create the cooldown timer and the rest timer


let cooldownTimer = new Timer(5, 'timer-value');
let restTimer = new Timer(15, 'timer-value')

//create an object with all three timer instances
let masterTimer = { sprint: sprintTimer, cooldown: cooldownTimer, rest: restTimer }

//create the truth values for each timer
let sprintFocus = true;
let cooldownFocus = false;
let restFocus = false
let truths = { sprint: sprintFocus, cooldown: cooldownFocus, rest: restFocus }
// Grab all the tabs

let tabs = document.querySelectorAll(".tab")


// loop through the nodelist of the tabs and listen for the
// click event for each ot the tabs. Then set their 

tabs.forEach(function (tab) {
  tab.addEventListener("click", function (e) {
    console.log(tabs)
    if (e.currentTarget.classList.contains("sprint")) {
      // console.log(`the [ ${e.currentTarget.classList} ] was clicked`)
      truths['sprint'] = true;
      truths['cooldown'] = false;
      truths['rest'] = false
      tab.classList.add('tab-focused')
      tabs[1].classList.remove('tab-focused')
      tabs[2].classList.remove('tab-focused')      // console.log(truths)
    }
    if (e.currentTarget.classList.contains("cooldown")) {
      // console.log(`the [ ${e.currentTarget.classList} ] was clicked`)
      truths['sprint'] = false;
      truths['cooldown'] = true;
      truths['rest'] = false;
      // console.log(truths)
      tab.classList.add('tab-focused')
      tabs[2].classList.remove('tab-focused')
      tabs[0].classList.remove('tab-focused')
    }
    if (e.currentTarget.classList.contains("rest")) {
      // console.log(`the [ ${e.currentTarget.classList} ] was clicked`)
      truths['sprint'] = false;
      truths['cooldown'] = false;
      truths['rest'] = true;
      tab.classList.add('tab-focused')
      tabs[0].classList.remove('tab-focused')
      tabs[1].classList.remove('tab-focused')
      // console.log(truths)
    }
    for (const timer in masterTimer) {
      // console.log(masterTimer[timer])
      if (truths[timer]) {
        masterTimer[timer].printTime()
      } else {
        masterTimer[timer].pause()
        masterTimer[timer].resetTimer()
      }
    }

  })
})



const timerLengths = document.querySelectorAll("input")
timerLengths.forEach(function (timerLength) {
  timerLength.addEventListener("blur", function (timerLength) {
    setTimer(this.id, this)

  })
});

const mute = document.querySelector("input[name=checkbox]");

mute.addEventListener("change",function () {

  for (const key in masterTimer) {
    if (mute.checked ) {
    masterTimer[key].audio.volume = 0;
    } else {
      masterTimer[key].audio.volume = 1;
      } 
  }
})


function setTimer(id, val) {
  // console.log("setTimer() fired")
  let newLength = Number(val.value);
  if (masterTimer[id].length > newLength) {

    masterTimer[id].seconds = masterTimer[id].seconds - (masterTimer[id].length - newLength) * 60
  } else {
    masterTimer[id].seconds = masterTimer[id].seconds + (newLength - masterTimer[id].length) * 60
  }
  masterTimer[id].length = newLength;
  if (truths[id]) {

    masterTimer[id].printTime();
  }
}

let settings = document.querySelector(".settings")
let settingsPage = document.querySelector('.modal')
let start = document.querySelector(".timer.start")
let pause = document.querySelector(".timer.pause")
let reset = document.querySelector(".timer.reset")
let closeModal = document.querySelector(".modal")
let close = document.querySelector(".close")

close.addEventListener("click", function () {
  closeModal.style.display = "none"
})

settings.addEventListener("click", function () {
  let on = settingsPage.style.display
  if (on === "block") {
    settingsPage.style.display = "none"
  } else {
    settingsPage.style.display = "flex"
    // settingsPage.style.position ="fixed";
    settingsPage.style.gridTemplateColumns = 1

  }
})

start.addEventListener("click", function () {


  Object.keys(truths).forEach((key) => {

    if (truths[key]) {

      if (!masterTimer[key].start) {
        masterTimer[key].startTimer()

        // while (masterTimer[key].start) {
        //   console.log("youre in an infinte loop sucker");
        // document.querySelector('.progress-bar').style.width = '1%';

        // }
      }
    }
  })




})

pause.addEventListener("click", function () {

  Object.keys(truths).forEach((key) => {

    if (truths[key]) {

      masterTimer[key].pause()
    }
  })

})

reset.addEventListener("click", function () {

  Object.keys(truths).forEach((key) => {

    if (truths[key]) {

      masterTimer[key].resetTimer()
      masterTimer[key].printTime();
    }
  })

})


