var tt2 =10,tt1=10;

var tt1X = 10,tt1Height = 110;
var tt2Y = 685,tt2Height = 70;

var score1 = 0, score2 =0;
var tt1Y;

var  playerscore =0;

var computer =0;
//ball x and y and speedx speed y and radius
var ball = {
    x:350/2,
    y:480/2,
    r:20,
    dx:3,
    dy:3
}

rightWristY = 0;
rightWristX = 0;
scoreRightWrist = 0;

game_status = "";

 

function setup(){
var canvas =  createCanvas(700,600);
canvas.parent('canvas');

video = createCapture(VIDEO);
video.size(700, 600);
video.hide();

poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses);
}

function modelLoaded() {
  console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
  if(results.length > 0)
  {

    rightWristY = results[0].pose.rightWrist.y;
    rightWristX = results[0].pose.rightWrist.x;
    scoreRightWrist =  results[0].pose.keypoints[10].score;
    console.log(scoreRightWrist);
  }
}

function startGame()
{
   game_status = "start";
   document.getElementById("status").innerHTML = "Game Is Loaded";
}

function draw(){
  if(game_status == "start")
{
  background(0); 
  image(video, 0, 0, 700, 600);

  fill("black");
  stroke("black");
  rect(680,0,20,700);

  fill("black");
  stroke("black");
  rect(0,0,20,700);

  if(scoreRightWrist > 0.2)
  {
    fill("red");
    stroke("red");
    circle(rightWristX, rightWristY, 30);
  }


    //funtion paddleInCanvas call 
    paddleInCanvas();
        
    //left paddle
    fill(250,0,0);
    stroke(0,0,250);
    strokeWeight(0.5);
    tt1Y = rightWristY; 
    rect(tt1X,tt1Y,tt1,tt1Height,100);


    
    fill("#FFA500");
    stroke("#FFA500");
    var tt2y =ball.y-tt2Height/2;  rect(tt2Y,tt2y,tt2,tt2Height,100);
    
    
    midline();
    
    
    drawScore();

      
    models();

    
    move();

    }

  }



//function reset when ball does notcame in the contact of padde
function reset(){
   ball.x = width/2+100,
   ball.y = height/2+100;
   ball.dx=3;
   ball.dy =3;   
}


//function midline draw a line in center
function midline(){
    for(i=0;i<480;i+=10) {
    var y = 0;
    fill("white");
    stroke(0);
    rect(width/2,y+i,10,480);
    }
}


//function drawScore show scores
function drawScore(){
    textAlign(CENTER);
    textSize(20);
    fill("white");
    stroke(250,0,0)
    text("Player:",100,50)
    text(playerscore,140,50);
    text("Computer:",500,50)
    text(computer,555,50)
}


//very important function of this game
function move(){
   fill(50,350,0);
   stroke(255,0,0);
   strokeWeight(0.5);
   ellipse(ball.x,ball.y,ball.r,20)
   ball.x = ball.x + ball.dx;
   ball.y = ball.y + ball.dy;
   if(ball.x+ball.r>width-ball.r/2){
       ball.dx=-ball.dx-0.5;       
   }
  if (ball.x-2.5*ball.r/2< 0){
  if (ball.y >= tt1Y&& ball.y <= tt1Y + tt1Height) {
    ball.dx = -ball.dx+0.5; 
    ball_touch_paddel.play();
  }
  else{
    computer++;
    missed.play();
    reset();
    navigator.vibrate(100);
  }
}
if(computer ==4){
    fill("#FFA500");
    stroke(0)
    rect(0,0,width,height-1);
    fill("white");
    stroke("white");
    textSize(25);
    text("Game Over!",width/2,height/2);
    text("Press Restart button to play again!",width/2,height/2+30)
    noLoop();
    computer = 0;
 }
   if(ball.y+ball.r > height || ball.y-ball.r <0){
       ball.dy =- ball.dy;
   }   
}


//width height of canvas speed of ball 
function models(){
    textSize(18);
    fill(255);
    noStroke();
    text("Width:"+width,135,15);
    text("Speed:"+abs(ball.dx),50,15);
    text("Height:"+height,235,15)
}

function paddleInCanvas(){
  if(tt1Y+tt1Height > height){
    tt1Y=height-tt1Height;
  }
  if(tt1Y < 0){
    tt1Y =0;
  }
 
  
}

function preload(){
  ball_touch_paddel = loadSound("ball_touch_paddel.wav");
  missed = loadSound("missed.wav");
}
function restart(){
  computer = 0;
  playerscore = 0;
  loop();
}