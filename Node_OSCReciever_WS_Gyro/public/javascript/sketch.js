

// Create connection to Node.JS Server
const socket = io();

let canvas;
let roll =0;
let pitch = 0;
let yaw = 0;
let detailY;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
 
  createEasyCam();
  detailY = createSlider(3, 100, 3); 
  detailY.position(10, height); 
  detailY.style('width', '80px'); 
  describe();
 
}

function draw() {
  background(200);

  fill("#f6644d"); 
  rotateX(roll);
  rotateY(yaw);
  torus(300,15);

  fill("#e48f9f"); 
  rotateX(pitch); 
  rotateY(yaw); 
  torus(300,15);

  fill("#dbb87f"); 
  rotateX(roll); 
  rotateY(yaw); 
  torus(300,15);

  fill("#f20c3a"); 
  rotateX(roll); 
  rotateY(yaw); 
  torus(120,10,15);

  fill("#7f89d8"); 
  rotateX(roll); 
  rotateY(yaw); 
  torus(80, 10, 16); 
  rotateX(roll); 
  rotateY(yaw); 
  torus(80, 10, 16); 
  rotateX(roll); 
  rotateY(yaw); 
  torus(80, 10, 16); 
  rotateX(roll); 
  rotateY(yaw); 
  torus(80, 10, 16); 
  rotateX(roll); 
  rotateY(yaw); 
  torus(80, 10, 16); 
  rotateX(roll); 
  rotateY(yaw); 
  torus(80, 10, 16); 
rotateX(roll); 
rotateY(yaw); 
torus(80, 10, 16); 
  rotateX(roll); 
  rotateY(yaw); 
  torus(80, 10, 16); 
  rotateX(roll); 
  rotateY(yaw); 
  torus(80, 10, 16); 

  
  
 
  

  rotateZ(pitch);
  rotateX(roll);
  rotateY(yaw);
  

 

}

//process the incoming OSC message and use them for our sketch
function unpackOSC(message){

  /*-------------

  This sketch is set up to work with the gryosc app on the apple store.
  Use either the gyro OR the rrate to see the two different behaviors
  TASK: 
  Change the gyro address to whatever OSC app you are using to send data via OSC
  ---------------*/

  //maps phone rotation directly 
  // if(message.address == "/gyrosc/gyro"){
  //   roll = message.args[0]; 
  //   pitch = message.args[1];
  //   yaw = message.args[2];
  // }

  //uses the rotation rate to keep rotating in a certain direction
  if(message.address == "/gyrosc/rrate"){
    roll += map(message.args[0],-3,3,-0.1,0.1);
    pitch += map(message.args[1],-3,3,-0.1,0.1);
    yaw += map(message.args[2],-3,3,-0.1,0.1);
  }
}

//Events we are listening for
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Connect to Node.JS Server
socket.on("connect", () => {
  console.log(socket.id);
});

// Callback function on the event we disconnect
socket.on("disconnect", () => {
  console.log(socket.id);
});

// Callback function to recieve message from Node.JS
socket.on("message", (_message) => {

  console.log(_message);

  unpackOSC(_message);

});