var pilot, ducks, b, pImg, dImg, bg, play, r, y, g;
var yImg, gImg;
var health = 100;
var score = 0;
var gameState = 0;

function preload(){
  pImg = loadImage("img/pilot1.5.png");
  dImg = loadImage("img/duck.png");
  bg = loadImage("img/sky.jpg");
  yImg = loadImage("img/pilot2.5.png");
  gImg = loadImage("img/pilot 3.5.png")
}

function setup() {
  createCanvas(displayWidth,displayHeight);
  pilot = createSprite(displayWidth/2, 400, 50, 50);
  pilot.addImage("air", pImg);
  w=random(100,950)
  play = createButton("Play")
  b = new Group();
}

function draw() {
  background(bg);
  textFont('Times New Roman')
  textSize(20);
  fill("red");
  text("Plane Integrity: "+health,100,100);
  text("Score: "+score, 100,150);
  pilot.debug = false;
  pilot.setCollider("rectangle", 0,0,160,140)

  if(gameState === 0){ 
    Customization();
    if(play.mousePressed()){
      gameState = 1;
    }
  }

  if(gameState === 1){
  score = score+ Math.round(getFrameRate()/10);

  r.hide();
  y.hide();
  g.hide();
  play.hide();
 
  if(pilot.isTouching(b)){
   health=health-1;
   b[0].destroy();
  }
  if(health<1){
    gameState = 2;
  }

  WATERFOWL();
  movement();
} 

  if(gameState === 2){
    pilot.velocityX = 0;
    pilot.velocityY = 0;
    b.destroyEach();
    textSize(20)
    fill("black");
    text("Your Plane Has Crashed Due Too Much Damage", displayWidth/2-150, displayHeight/2-50)
    textSize(20)
    fill(249, 49, 36)
    text("Game Over", displayWidth/2-10, displayHeight/2)
  }
  
  drawSprites();
}

function movement(){
  if(keyWentDown(LEFT_ARROW)){
    pilot.velocityX=-8;
  } 
  if(keyWentUp(LEFT_ARROW)){
    pilot.velocityX=0;
  }
  if(keyWentDown(UP_ARROW)){
    pilot.velocityY=-3;
  } 
  if(keyWentUp(UP_ARROW)){
    pilot.velocityY=0;
  }
  if(keyWentDown(DOWN_ARROW)){
    pilot.velocityY=+3;
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
  if(frameCount%200 === 0) {
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

function Customization(){
r = createButton("Red");
r.position(100,200);
y = createButton("Yellow");
y.position(100,250);
g = createButton("Green");
g.position(100,300);

if(y.mousePressed()){
  pilot.addImage("variant", yImg);
}

if(r.mousePressed()){
  pilot.addImage("variant", pImg);
}

if(g.mousePressed()){
  pilot.addImage("variant2", gImg)
}
}