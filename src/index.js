// import * as THREE from "three"

import Timer from "./timer.js"


//Set the display timer to the 25 minute sprint timer

let sprintTimer = new Timer(.1,'timer-value');
sprintTimer.printTime();

//create the cooldown timer and the rest timer


let cooldownTimer = new Timer(5,'timer-value');
let restTimer = new Timer(15,'timer-value')

//create an object with all three timer instances
let masterTimer = {sprint: sprintTimer,cooldown: cooldownTimer,rest: restTimer}

//create the truth values for each timer
let sprintFocus = true;
let cooldownFocus = false;
let restFocus = false
let truths = {sprint:sprintFocus,cooldown:cooldownFocus,rest:restFocus}
// Grab all the tabs

let tabs = document.querySelectorAll(".tab")


// loop through the nodelist of the tabs and listen for the
// click event for each ot the tabs. Then set their 

tabs.forEach(function(tab){
  tab.addEventListener("click",function(e) {
    
    if (e.currentTarget.classList.contains("sprint")) {
      console.log(`the [ ${e.currentTarget.classList} ] was clicked`)
      truths['sprint'] = true;
      truths['cooldown'] = false;
      truths['rest'] = false
      console.log(truths)
    } 
    if (e.currentTarget.classList.contains("cooldown")) {
      console.log(`the [ ${e.currentTarget.classList} ] was clicked`)
      truths['sprint'] = false;
      truths['cooldown'] = true;
      truths['rest'] = false;
      console.log(truths)
    } 
    if (e.currentTarget.classList.contains("rest")) {
      console.log(`the [ ${e.currentTarget.classList} ] was clicked`)
      truths['sprint'] = false;
      truths['cooldown'] = false;
      truths['rest'] = true;
      console.log(truths)
    } 
    for (const timer in masterTimer) {
      console.log(masterTimer[timer])
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
timerLengths.forEach(function(timerLength) {
  timerLength.addEventListener("blur",function(timerLength){
    setTimer(this.id,this)
      
  })
});

function setTimer(id,val) {
  // console.log("setTimer() fired")
  let newLength = Number(val.value);
  if (masterTimer[id].length > newLength) {
    
    masterTimer[id].seconds = masterTimer[id].seconds - (masterTimer[id].length - newLength) * 60
  } else {
    masterTimer[id].seconds = masterTimer[id].seconds + ( newLength - masterTimer[id].length) * 60 
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

close.addEventListener("click",function(){
  closeModal.style.display = "none"
})

settings.addEventListener("click",function(){
  let on = settingsPage.style.display
  if (on === "block") {
    settingsPage.style.display = "none"
  } else {
    settingsPage.style.display = "flex"
    // settingsPage.style.position ="fixed";
    settingsPage.style.gridTemplateColumns = 1
    
  }
})

start.addEventListener("click", function() {
  
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

pause.addEventListener("click",function(){
    
  Object.keys(truths).forEach((key) => {

    if (truths[key]) {

        masterTimer[key].pause()
    }
  })
  
})

reset.addEventListener("click",function(){

  Object.keys(truths).forEach((key) => {

    if (truths[key]) {

        masterTimer[key].resetTimer()
        masterTimer[key].printTime();
    }
  })

})




//Progress bar function that takes in the percentage doneness
// const canvas = document.getElementById('progress-bar')
// let progressBar = function (canvas) {
  
//   return {
//       ctx: document.getElementById(canvas).getContext('2d'),
//       display: function (p,color) {
//         console.log(color)
//       this.ctx.fillStyle = "orange";
//       this.ctx.fillRect(0,0,this.ctx.canvas.width, this.ctx.canvas.height);
//       this.ctx.fillStyle = color;
//       this.ctx.fillRect(0,0,p * this.ctx.canvas.width / 100, this.ctx.canvas.heigt);
//       console.log(100);
//       console.log(this.ctx.canvas.height);
//     }
//   };
// };

// progressBar("progress-bar").display(20,'#ffffff');






// console.log(ctx);
// ctx.fillStyle = 'blue';
// ctx.fillRect(10,10,620,1000);



// document.addEventListener("")



// // Create an empty scene
// let scene = new THREE.Scene();

// // Create a basic perspective camera
// let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
// camera.position.z = 4;

// // Create a renderer with Antialiasing
// // let renderer = new THREE.WebGLRenderer({antialias:true});

// // Configure renderer clear color
// renderer.setClearColor("#000000");

// // Configure renderer size
// renderer.setSize( window.innerWidth, window.innerHeight );

// // Append Renderer to DOM This is where the canvas is written to so i need to add this as a child of the
// // thing that i want it to be on 
// document.body.appendChild( renderer.domElement );

// // Create a Cube Mesh with basic material
// let geometry = new THREE.BoxGeometry( 1, 1, 1 );
// let material = new THREE.MeshBasicMaterial( { color: "#ffffff" } );
// let cube = new THREE.Mesh( geometry, material );

// // Add cube to Scene
// scene.add(cube);

// // Render Loop
// let render = function () {
//   requestAnimationFrame( render );

//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;

//   // Render the scene
//   renderer.render(scene, camera);
// };

// render();

