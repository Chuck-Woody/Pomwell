// import * as THREE from "three"

import Timer from "./timer.js"

let workTimer = new Timer(25,'timer-value');
// function setTimer() {

  const val = document.querySelector("input[id='timer-length']")
  val.onblur = setWorkTimer;
// }

function setWorkTimer() {
  console.log("setWorkTimer() fired")
  let newLength = Number(val.value);
  if (workTimer.length > newLength) {
    
    workTimer.seconds = workTimer.seconds - (workTimer.length - newLength) * 60
  } else {
    workTimer.seconds = workTimer.seconds + ( newLength - workTimer.length) * 60 
  }
  workTimer.length = newLength;
  if (!workTimer.start) {

    workTimer.printTime();
  }
}

let hello = document.querySelector(".settings")
let settingsPage = document.querySelector('.modal')
let start = document.querySelector(".timer.start")
let pause = document.querySelector(".timer.pause")
let reset = document.querySelector(".timer.reset")
let closeModal = document.querySelector(".modal")
let close = document.querySelector(".close")

close.addEventListener("click",function(){
  closeModal.style.display = "none"
})

hello.addEventListener("click",function(){
  let on = settingsPage.style.display
  if (on === "block") {
    settingsPage.style.display = "none"
  } else {
    settingsPage.style.display = "flex"
    settingsPage.style.gridTemplateColumns = 1
    
  }
})

start.addEventListener("click", function() {

  workTimer.startTimer()
})

pause.addEventListener("click",function(){
  workTimer.pause()
})

reset.addEventListener("click",function(){

  workTimer.resetTimer()

})
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