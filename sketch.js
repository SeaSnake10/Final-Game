var pilot, ducks, b, pImg, dImg, bg, play, game, quack, l, reset, over, r;
var yImg, gImg;
var health = 10;
var score = 0;
var HighScore;
var gameState = 0;
var database;

function preload(){
  pImg = loadImage("img/pilot1.5.png");
  dImg = loadImage("img/duck.png");
  bg = loadImage("img/sky.jpg");
  quack = loadSound("duckdying.wav");
  over = loadSound("over.wav")
  r = loadImage("img/reset.png")
}

function setup() {
  createCanvas(displayWidth,displayHeight);
  pilot = createSprite(displayWidth/2, 400, 50, 50);
  pilot.addImage("air", pImg);
  w=random(10,1000);
  l = createSprite(displayWidth/2, displayHeight/4, displayWidth, displayHeight);
  l.addImage("landscape", bg)
  l.scale = 2.5;
  reset = createSprite(1250,100,10,10);
  reset.addImage("restart", r);
  reset.scale = 0.4;
  b = new Group();
  game = new Game();
  database = firebase.database();
  game.getHighScore();
}

function draw() {
  background(bg);
  infinity();
  pilot.debug = false;
  pilot.setCollider("rectangle", 0,0,160,140)
  if(score>HighScore){
    HighScore = score;
    game.update();
  }
  l.depth = pilot.depth;
  pilot.depth=pilot.depth+1;
  reset.depth = pilot.depth;
  drawSprites();
  textFont('Times New Roman')
  textSize(20);
  fill("red");
  text("Plane Integrity: "+health,100,100);
  text("Score: "+score, 100,150);
  text("High Score:"+HighScore, 100, 200);
  game.display();
}

function movement(){
  if(keyWentDown(LEFT_ARROW)){
    pilot.velocityX=-8;
  } 
  if(keyWentUp(LEFT_ARROW)){
    pilot.velocityX=0;
  }
  if(keyWentDown(UP_ARROW)){
    pilot.velocityY=-5;
  } 
  if(keyWentUp(UP_ARROW)){
    pilot.velocityY=0;
  }
  if(keyWentDown(DOWN_ARROW)){
    pilot.velocityY=+5;
  } 
  if(keyWentUp(DOWN_ARROW)){
    pilot.velocityY=0;
  }
  if(keyWentDown(RIGHT_ARROW)){
    pilot.velocityX=+8;
  } 
  if(keyWentUp(RIGHT_ARROW)){
    pilot.velocityX=0;
  }
}

function WATERFOWL() {
  if(frameCount%150 === 0) {
    for(i=0;i<5;i++)
  {
    w=random(200,950);
    h=random(-height*4,height-300);
  ducks = createSprite(w,h,10,40);
  ducks.addImage("avian", dImg)
  ducks.scale = 0.5;
  ducks.velocityY = ducks.velocityY+score/100;
  ducks.lifetime = 300;
  b.add(ducks)
  }
  }
}

function infinity(){
  l.velocityY = 4
  if(l.y>displayHeight-400){
    l.y = displayHeight/4
  }
}

