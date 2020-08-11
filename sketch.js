var engine,world;
const Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies,
  Constraint = Matter.Constraint;

var gameState = "onSling";

var score = 0;

var backgroundImg;

var drag, dragImg, gameOver, gameOverImage;

var cool, coolImg, awesome, awesomeImg, oops, oopsImg;

var ballCount = 15;

function preload(){
  backgroundImg = loadImage("images/bg.jpg");
  //dragImg = loadImage("images/drag.png");
  coolImg = loadImage("images/cool.jpg");
  awesomeImg = loadImage("images/awesome.jpg");
  oopsImg = loadImage("images/oops.jpg");
  gameOverImg = loadImage("images/gameover.jpg");

}

function setup() {
  createCanvas(displayWidth,displayHeight-150);

  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);

  ground = new Ground(displayWidth/2,displayHeight-160,displayWidth,20);
  ground1 = new Ground(-8,-200,10,2000);
  ground2 = new Ground(1445,-200,10,2000);

  ball = new Ball(700,250);
  basket1 = new Basket(77,185,8,140);
  basket2 = new Basket(155,310,10,90);
  basket3 = new Basket(245,310,10,90);

  

  slingshot = new Slingshot(ball.body,{x:700,y:230});


  //createSprite(400, 200, 50, 50);
}

function draw() {
  background(backgroundImg); 
  
 ball.display();
  //ground.display();
  ground1.display();
  /*basket1.display();
  basket2.display();
  basket3.display();*/
  ground2.display();

  if(gameState === "onSling"){
    textSize(20);
    fill(0,250,255);
    textFont("Algerian");
    text("Drag the mouse to take the shot!!",550,30);
    //drag.addImage("drag",dragImg);
  }
  
  if(ball.body.position.x>155 &&ball.body.position.x<245 &&ball.body.position.y>265 &&ball.body.position.y<365){
    textSize(30)
    fill("blue");
    text("Shot Cleared!!!",700,450);
    score = score + 5;
    //cool.addImage("cool",coolImg);
  }
  textSize(20);
  fill("yellow");
  text("Score : "+ score,1200,50)

  textSize(25);
  fill("purple");
  text("Shoot the left basket!",600,700)

  
 //drawSprites();
}

function mouseDragged(){
  gameState = "released";
  Matter.Body.setPosition(ball.body,{x:mouseX, y:mouseY});
}

function mouseReleased(){
  slingshot.fly();
}

function keyPressed(){
  if(keyCode===32 &&ball.body.speed<1){
    gameState = "onSling";
    //drag.addImage("drag",dragImg);
    textSize(20);
    fill(0,250,255);
    textFont("Algerian");
    text("Drag the mouse to take the shot!!",550,30);
    Matter.Body.setPosition(ball.body,{x:700, y:230});
    slingshot.attach(ball.body);
  }
}