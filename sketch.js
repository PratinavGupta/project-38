var points = 0, deaths = 2;
var gameState = "play";
function preload() {
  bananaImg = loadImage("banana.png");
  stoneImg = loadImage("stone.png");
  backgroundImg = loadImage("jungle.jpg");
  monkeyImg = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
}

function setup() {
  createCanvas(windowWidth - 40, windowHeight - 40);

  monkey = createSprite(100, height / 2);
  monkey.addAnimation("running", monkeyImg);
  monkey.scale = 0.15;
  ground = createSprite(width / 2, height - 50, width * 4, 10);
  ground.visible = false;

  bananagroup = createGroup();
  stonegroup = createGroup();
}


function draw() {

  background(backgroundImg);
  monkey.collide(ground);
  monkey.velocityY = 8;
  camera.position.x = monkey.position.x
  camera.position.y = height / 2;

  if (gameState == "play") {

    if (width > 1000)
      Rwidth = (Math.floor(width / 1000)) * 1000;
    else
      if (width > 100)
        Rwidth = (Math.floor(width / 100)) * 100;
      else
        Rwidth = 1;

    textSize(20);
    fill("white");
    text("Points = " + points, monkey.position.x, monkey.position.y - 500);
    text("   Deaths = " + deaths, monkey.position.x + 100, monkey.position.y - 500);


    if (monkey.position.x % Rwidth == 0)
      ground.position.x = monkey.position.x

    if (World.frameCount % 80 === 0) {
      var banana = createSprite(monkey.position.x + width + 10, height - 150);
      banana.addImage("Banana", bananaImg);
      banana.scale = 0.05;
      bananagroup.add(banana);
      bananagroup.setLifetimeEach(900);
    }

    if (bananagroup.isTouching(monkey)) {
      points++;
      bananagroup.destroyEach();
    }

    if (keyWentDown("W") && monkey.position.y > 500)
      monkey.position.y = monkey.position.y - 100;
    if (keyWentDown("d"))
      monkey.position.x = monkey.position.x + 100;
    if (keyWentDown("a"))
      monkey.position.x = monkey.position.x - 100;

    if (World.frameCount % 140 === 0) {
      var stone = createSprite(monkey.position.x + width + 10, height - 100);
      stone.addImage("stone", stoneImg);
      stone.scale = 0.15;
      stonegroup.add(stone);
      stonegroup.setLifetimeEach(400);
    }
    if (stonegroup.isTouching(monkey)) {
      deaths++;
      stonegroup.destroyEach();
    }

    if (monkey.position.x == 10000) {
      fill("lightblue")
      text("YOU WIN", width / 8, height / 2)
      gameState = "win"
    }
    if (deaths == 3) {

      gameState = "loss";
    }
  }
  if (gameState == "loss") {
    fill("white");
    textSize(30)
    text("YOU LOSS", monkey.position.x, height / 4);
    text("Press R to restart", monkey.position.x, height / 2);
    if (keyWentDown("r")) {
      deaths = 0;
      points = 0;
      gameState = "play";
    }

  }


  drawSprites();
}