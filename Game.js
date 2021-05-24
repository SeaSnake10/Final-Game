class Game{
    constructor(){}

    update(){
        database.ref('/').update({
          HighScore: HighScore
        });
    }

    getHighScore(){
        var HighScoreRef  = database.ref('HighScore');
        HighScoreRef.on("value",function(data){
            HighScore = data.val();
         })
    }

    display(){
        if(gameState === 0){ 
            text("Press Space to Play", displayWidth/2-80, 300)
            if(keyDown("SPACE")){
              gameState = 1;
            }
            l.velocityY = 0;
          }
        
          if(gameState === 1){
          score = score+ Math.round(frameCount/100);
         
          if(pilot.isTouching(b)){
           health=health-1;
           b[0].destroy();
           quack.play();
          }
          if(health<1){
            gameState = 2;
            over.play();
          }
          if(mousePressedOver(reset)){
            gameState = 0;
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
            text("Your Plane Has Crashed Due To Too Much Damage", displayWidth/2-150, displayHeight/2-50)
            textSize(20)
            fill(249, 49, 36)
            text("Game Over", displayWidth/2-10, displayHeight/2)
            l.velocityY = 0;
          }
    }
}