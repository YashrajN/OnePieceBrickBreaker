/*
-proper choice of data types for variables and parameters-(10+)
-proper use of variables and data types-
-user defined functions with appropriate parameters - at least three-(8)
-at least two types of user input / events- (3)
-selection structures (if statements) - at least three- (10+)
-repetition structures (conditional loops(1) and counted loops(5))-
-use of random numbers- (6)
-counters- (8)
-accumulators- (1)
-appropriate use of built in functions- (10+)
-use of a list or array- (4)
-properly formatted/commented source code-
-The game requires very clear win/loose conditions-
-Extra- 2D arrays, music in background
-User Documentation containing rules/directions for the game / application-
*/
var blockw = 50; // 80
var blockh = 25;
var basew = 80; //80
var baseh = 10; //15
var basex = 300 - basew;
var basey = 480 - baseh;
var bally = 480 - 35;
var ballx = 230;
var ballw = 15;
//Speed of the ball
var speedx;
var speedy;
//Speed of the base 
var move;
var blockshown = [];
var level = 1;
//Determines what part of the game is activated
var gamemode = 0;
var song;
var menu;
var gameplay;
var colorOfPlayButton;
var gg; //gameover
var fail;
var colorOfTextp;
var colorOfTextM;
var colorOfInstructionsButton;
var colorOfTextI;
var colorOfMenuButton;
var lives = 2;
var life = [];
var space = 32;
var loadbackground;
var countdown = 59; //109
var loadbarx = 100;
var loadbary = 430; //250
var loadbarw = 0;
var levelup;
var score = 0;
var scoreTotal = 0;
var plop;
var block = [];

function preload(){
  song = loadSound("Batttle.mp3");//Gameplay
  fail = loadSound("Fail.mp3");//Lose
  menu = loadImage("Op.jpeg");//Menu
  gameplay = loadImage("g4.jpg"); //Gameplay
  gg = loadImage("Gameo.jpg"); //Game over
  loadbackground = loadImage("jollyroger.png")//Loading Screen
  plop = loadSound("plop1.m4a");//Event sound
}

function setup(){
  createCanvas(501, 500);
  block = [null,null,null];
  //Creates a 2D array that takes care of the x[0],y[1], and true/false[2] of the blocks
  block[0] = [90,150, 210, 270, 330,90,150, 210, 270, 330,
             90,150,210, 270, 330,90,150, 210, 270, 330,90,
             150, 210,270, 330, 90,150, 210, 270, 330];
  
  block[1] = [70,70,70,70,70,100,100,100,100,100,130,130,130,                  
             130,130,160,160,160,160,160,190,190,190,190,
             190,220,220,220,220,220,250,250,250,250,
             250,280,280,280,280,280];
  
  block[2] = [true, true, true, true, true, true, true, true,
             true, true, true, true, true, true, true, true,
             true, true, true, true, true, true, true, true,
             true, true, true, true, true, true];
  
  //Sets a random value everytime the game starts
  speedx = Math.abs(speedx);
  speedy = Math.abs(speedy);
  speedy = random(2,4);
  speedx = random(2,4);
  //Plays the song on a loop when ever the game starts 
  song.loop();
  //Sets a color for all the buttons
  colorOfPlayButton = color(250,250,0);
  colorOfTextp = color(0);
  colorOfInstructionsButton = color(250,250,0);
  colorOfMenuButton = color(250,250,0);
  colorOfTextI = color(0); 
  colorOfTextM = color(0);
  //Sets up where to display the lives
  life = [162,182,202];
}

function draw(){
  mainMenu(0);
  instructions(1);
  loading(3);
  if(gamemode == 4)
     {
       //Background for gameplay
       background(gameplay);
       base(500);
       ball();
       CCBB();
       Block();
       BBCC();
       movement(10);//12
       Score(0);
       Level(3);
       Lose(500);
     }
}

//Creates a loading animation for added effect
function loading(load){
  if(gamemode == load)
     {
       background(loadbackground);
       fill(255);
       textSize(30);
       text("Starting game in " + (int)(countdown/10), 128,30);
       fill(0);
       stroke(255);
       rect(loadbarx,loadbary,300,50);
       fill(255);
       noStroke();
       rect(loadbarx,loadbary,loadbarw,50);
       countdown -= 0.18;//0.18
       loadbarw += 1.111;//0.548
       stroke(0);
     }
  if((int)(countdown/10) == 0)
     {
       gamemode = 4;
     }
  
}

function instructions(rule){
  if(gamemode == rule)
    {
      textStyle(BOLD);
      background(menu);
      fill(0);
      textSize(30);
      text("How To Play?", 152,30);
      textSize(20);
      text("- Use the lateral arrow keys to move \n   the base right or left \n- Maneuver the base to block the ball \n   from falling bellow it \n- In order to increase your level use \n   the ball to destroy all the bricks \n- Score increases by 5 when a block \n   is hit and by 2 when the base is hit \n- You have 3 lives... Enjoy!", 80,54);
      //Makes the "Click to play" button
      fill(colorOfPlayButton);
      rect(135, 300, 250, 100);
      fill(colorOfTextp);
      textSize(30);
      textStyle(NORMAL);
      text("Click Here To Play", 137, 360);
      //Makes the Main menu button button
      fill(colorOfMenuButton);
      rect(390, 450, 100, 25);
      fill(colorOfTextM);
      textSize(15);
      text("Main menu", 400, 467);
    }

}

function mousePressed(){
  //Checks if the "Click to play" button is pressed
  if(mouseX >= 135 && mouseX <= 385 && 
     mouseY >= 300 && mouseY <= 400 && gamemode < 3)
    {
      plop.play();
      //When the button is pressed gameplay starts
      gamemode = 3;
    }
  
  //Checks if the "Instructions" button is pressed
  //Checks for gamemode being 1 so that if mousePressed() at the location during gameplay nothing happens
  if(mouseX >= 15 && mouseX <= 115 && 
     mouseY >= 450 && mouseY <= 475 && gamemode <= 1)
    {
      plop.play();
      gamemode = 1;
    }
  //Checks if the "Main Menu" button is pressed
  //Checks for gamemode being 1 so that if mousePressed() at the location during gameplay nothing happens
  if(mouseX >= 390 && mouseX <= 490 && 
     mouseY >= 450 && mouseY <= 475 && gamemode == 1)
    {
      plop.play();
      gamemode = 0;
    }
  
}

function mainMenu(home){
  if(gamemode == home)
    {
      background(menu);
      //Title and name
      textStyle(BOLD);
      fill(0);
      textSize(20);
      text("Yashraj Nagpal", 10,30);
      textSize(50);
      text("Brick Breaker", 100,120);
      //Makes the "Click to play" button
      fill(colorOfPlayButton);
      rect(135, 300, 250, 100);
      fill(colorOfTextp);
      textStyle(NORMAL);
      textSize(30);
      text("Click Here To Play",137, 360);
      //Makes the Instuctions button
      fill(colorOfInstructionsButton);
      rect(15, 450, 100, 25);
      fill(colorOfTextI);
      textSize(15);
      text("Instructions", 25, 467);
    }
  //Changes color of button as mouse hovers on it 
  if(mouseX >= 135 && mouseX <= 385 && mouseY >= 300 &&
     mouseY <= 400 )
    {
       colorOfPlayButton = color(190,190,0);
       colorOfTextp = color(0);
    }else if(mouseX >= 15 && mouseX <= 115 && 
             mouseY >= 450 && mouseY <= 475)
            {
             colorOfInstructionsButton = color(190,190,0);
             colorOfTextI = color(0);
            }else if(mouseX >= 390 && mouseX <= 490 && 
                     mouseY >= 450 && mouseY <= 475)
                    {
                      colorOfMenuButton = 
                                        color(190,190,0);
                      colorOfTextM = color(0);
                    
  
                    }else
                        {
                           colorOfTextp = color(0);
                           colorOfPlayButton = 
                                           color(250,250,0);
                           colorOfTextI = color(0);
                           colorOfInstructionsButton = 
                                            color(250,250,0);
                           colorOfTextM = color(0);
                           colorOfMenuButton = 
                                            color(250,250,0);
                         }
}

function Level(numarrangments){
  levelup = 0;
  var i = 0;
  //Uses a counter to check if all 30 blocks are destroyed
  while(i < 30)
    {
    if(block[2][i] == false)
      {
       levelup++;
      }
      i++;
    }
  //Checks if all 30 blocks are broken
  //If all blocks are broken increase the level and speed, and draw all the blocks
  if(levelup == 30)
    {
      noLoop();
      textSize(20);
      fill(255);
      textStyle(BOLD);
      stroke(0);
      text("Congratulatons you \n beat the level, press \n   space to resume", 170,260);
      level++;
      for(var p = 0; p< 30; p++)
        {
          block[2][p] = true;
        }
  //Increases the speed of the ball by a random value so the pattern is different and more challenging every level
  speedx = Math.abs(speedx);
  speedy = Math.abs(speedy);
  speedy = random((speedy+0.5), (speedy+1));
  speedx = random((speedx+1), (speedx+1.5));
  //Resets the position of everything
  basex = 300 - basew;
  basey = 480 - baseh;
  bally = 480 - 35;
  ballx = 230;
    }
  
  //This makes it so the layout of the x coordinates for the blocks alternate
  if(level%numarrangments==1)
     {
     block[0] = [90,150, 210, 270, 330,90,150,210,
                270,330,90,150,210, 270,330,90,150,
                210, 270,330,90,150,210,270, 330,90,
                150, 210, 270,330];
     }else if(level%numarrangments==0)
             {
             block[0] = [35,135, 235, 335, 435,10,110, 210,
                        310,410,35,135, 235, 335, 435,10,110,
                        210,310,410,35,135, 235, 335, 435,
                        10,110,210, 310, 410];
             }else if(level%numarrangments==2)
                      {
                      block[0] = [10,110, 210, 310, 410,10,110,
                                 210, 310,410,10,110, 210, 310,
                                 410,10,110,210,310,410,10,110,
                                 210, 310, 410, 10,110, 210,
                                 310, 410];
                      }
}

function Lose(border){
  //Checks if the ball goes bellow the canvas
  if(bally >= border && lives == 0)
    {
      noLoop();
      song.stop();
      fail.play();
      background(gg);
      textSize(25);
      fill(255);
      textStyle(BOLD);
      stroke(0);
      text("         Game over \nYou made it to Level " +  
         level + " \n    Your score was "+ scoreTotal +"\nPress Space to play again", 125,250);
      scoreTotal = 0;
    //Checks if the player lost a life
    }else if(bally >= 500)
            {
              //If so, this gives them a chance to resume at their own pace
              noLoop();
              textSize(20);
              fill(255);
              textStyle(BOLD);
              stroke(0);
              text("You lost a life, press \n   space to resume", 170,270);
            }
}

function Score(endscore){
  //Displays the level and number of lives during the gameplay
  fill(0);
  textSize(20);
  textStyle(BOLD);
  noStroke();
  text("Level: " + level, 10,30);
  text("Score: " + scoreTotal, 10,60);
  text("Lives: ", 97,30);
  fill(0,255, 255);
  stroke(0);
  ellipseMode(CORNER);
  //Draws the number of lives
  for(var i = 0; i <= lives; i++)
     {
       ellipse(life[i],17,15,15);
     }
  //Uses an accumulator to calculate the total score
  scoreTotal = scoreTotal + score;
  score = endscore;
}
  
function movement(move){
  //Allows the keys to move the base
  if (keyIsDown(LEFT_ARROW)) 
    {
      basex -= move;
    }else if (keyIsDown(RIGHT_ARROW))
      {
        basex += move;
      }
}

function base(border){
  //Makes the base appear on the other end of the canvas if it goes out
  fill(220,0,220);
  rect(basex,basey,basew,baseh);
  if(basex < -basew)
    {
      basex = border;
    }
  if(basex > border)
    {
      basex = -basew;
    }
  }

function ball(){
  fill(0,255, 255);
  ellipseMode(CORNER);
  ellipse(ballx,bally,ballw, ballw);
  //Makes the ball bounce off the walls
  if(ballx >= 500 - ballw ||ballx <= 0)
    {
      speedx *= -1;
    }
  if(bally <= 0)
    {
     speedy *= -1;
    }
  bally += speedy;
  ballx += speedx;
}

function CCBB(){
  //Checks if the is collision between the base and ball
  if(collisionCheck(basex, basey, basew, baseh))
    {
      //If so a sound plays
      plop.play();
      //If so the score is 2
      score = 2;
      //Checks if the collision is on the left or right side of the base
      if(((basex + basew - ballx) <=  
          (bally +  ballw - basey) && 
          (basex + basew - ballx) <= 
          (basey + baseh - bally) && 
          (basex + basew - ballx) <= 
          (ballx + ballw -  basex)) ||
          ((ballx + ballw - basex) <= 
          (bally +  ballw - basey) &&
          (ballx + ballw - basex) <= 
          (basey + baseh - bally) && 
          (ballx + ballw - basex) <= 
          (basex + basew - ballx)))
        {
          //Checks if the base is moving when it collides
          if (keyIsDown(LEFT_ARROW) ||
              keyIsDown(RIGHT_ARROW)) 
             {
               bally -= (baseh + ballw);
             }         
          speedx *= -1;
          speedy *= -1;
        }else
          {
            speedx *=  1;
            speedy *= -1; 
          }
       //Checks if the ball collides bellow the base
       if((bally + ballw - 5) > basey)
          {
            //Checks if the base is moving when it collides
            if (keyIsDown(LEFT_ARROW) ||
                keyIsDown(RIGHT_ARROW)) 
              {
                bally -= (baseh + ballw);
              }
          }
     }
}

function collisionCheck (basex, basey, basew, baseh){
  return (ballx < basex + basew) && (bally < basey + baseh) &&
         (ballx + ballw > basex) && (bally + ballw > basey);
}

function BBCC(){
  var c = 0
  for(var i = 0; i < 30; i++)
     {
       //Checks if there is collision between the blocks and ball
       if(collisionCheck(block[0][i], block[1][i], blockw, blockh) && block[2][i] == true && c ==0) 
          { 
            //If so a sound plays
            plop.play();
            //If so the score is 5
            score = 5;
            //Checks if the collision is on the right or left side of the block
            c++
            if(((block[0][i] + blockw - ballx) <=  
                (bally +  ballw - block[1][i]) && 
                (block[0][i] + blockw - ballx) <= 
                (block[1][i] + blockh - bally) && 
                (block[0][i] + blockw - ballx) <= 
                (ballx + ballw - block[0][i]))||
                ((ballx + ballw - block[0][i]) <= 
                (bally +  ballw - block[1][i]) && 
                (ballx + ballw - block[0][i]) <= 
                (block[1][i] + blockh - bally) && 
                (ballx + ballw - block[0][i]) <= 
                (block[0][i] + blockw - ballx)))
              {
                block[2][i] = false
                speedx *= -1
                speedy *= 1 
              }else
                {
                  block[2][i] = false
                  speedx *=  1
                  speedy *= -1 
                }
          }
     }
   c= 0
}

/*
function collisionCheck(blockx, blocky, blockw, blockh){
  return (ballx < blockx + blockw) && 
         (bally < blocky + blockh) &&
         (ballx + ballw > blockx) && (bally + ballw > blocky);
}
*/

function Block(){
  for(var i = 0; i<30; i++)
     {
       //Draws the blocks only if they are true (not broken)
       if(block[2][i])
         {
           fill(150,0,200);
           rect(block[0][i],block[1][i], blockw, blockh);
         }
     }
}

function keyPressed(){
  //Starts the game over if space is pressed when the user loses
  if(keyCode == space && bally >= 500 && lives == 0) 
    {
      level = 1;
      for(var p = 0; p< 30; p++)
         {
           block[2][p] = true;
         }
      speedx = Math.abs(speedx);
      speedy = Math.abs(speedy);
      speedy = random(2,4); 
      speedx = random(2,4);
      basex = 300 - basew;
      basey = 480 - baseh;
      bally = 480 - 35;
      ballx = 230;
      lives = 2;
      song.loop();
      loop();
     }
  //Checks if the player lost a life
  if(keyCode == space && bally >= 500 && lives > 0) 
    {
      //Once the player presses space the game resumes
      lives--;
      speedx = Math.abs(speedx);
      speedy = Math.abs(speedy);
      basex = 300 - basew;
      basey = 480 - baseh;
      bally = 480 - 35;
      ballx = 230;
      loop();
     }
  //Checks if the player beat the level and wants to resume
  if(keyCode == space && levelup == 30) 
    {
      //Once the player presses space the game resumes
      loop();
    }
}
