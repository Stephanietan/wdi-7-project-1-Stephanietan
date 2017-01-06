var viewport;
var batSprite
var crossHair
var scoreText
var timer
var queue;
var WIDTH = 900;
var HEIGHT = 676;
var batW = 192;
var batH = 117;
var enemyXPos=50; // enemy X start position
var enemyYPos=50; // enemy Y start position
var enemyXPos1=100; // enemy X start position
var enemyYPos1=1-0; // enemy Y start position
var enemyXPos2=150; // enemy X start position
var enemyYPos2=150; // enemy Y start position
var enemyXSpeed = 1.25; //original 1.55
var enemyYSpeed = 1.55; //original 1.75
var enemyXSpeed1 = 1.05; //original 1.55
var enemyYSpeed1 = 1.15; //original 1.75
var enemyXSpeed2 = 1.35; //original 1.55
var enemyYSpeed2 = 1.25; //original 1.75
var score = 0;
var gameTimer;
var gameTime = 0;

Assets = {
  backgroundImage: "url(assets/background.png)",
  crossHair: "url(assets/crosshair.png)",
  batSpritesheet: "url(assets/batSpritesheet.png)",
  batDeath: "url(assets/batDeath.png)",
  shot: "url(assets/shot.mp3)"
}

viewport = document.getElementById("container")
batSprite = document.getElementById("flyingBat")
batSpriteTwo = document.getElementById("flyingBatTwo")
batSpriteThree = document.getElementById("flyingBatThree")
batDeath = document.getElementById("batDeath")
crossHair = document.getElementById("shoot")
scoreText = document.getElementById("score")
timer = document.getElementById("timer")


function Sprite(options) {
  var that = {}
  that.width = options.width
  that.height = options.height
  that.image = options.image
  return that
}

window.onload = function() {
  //load background
  viewport.style.width = WIDTH + "px"
  viewport.style.height = HEIGHT + "px"
  viewport.style.position = "relative"
  viewport.style.backgroundImage = Assets.backgroundImage
  viewport.style.backgroundSize = "contain"

  //create bat sprite
  batEnemy()

  //load timer
  // gameTimer = setInterval(updateTime, 1000);

  //move the bat
  requestAnimationFrame(tickEvent)
  requestAnimationFrame(tickEvent1)
  requestAnimationFrame(tickEvent2)
}

window.onmousemove = function () {
  crossHair.style.left = event.pageX-50 + "px"
  crossHair.style.top = event.pageY-50 + "px"
}
window.onmousedown = handleMouseDown
// window.onmousedown = handleMouseDown1
// window.onmousedown = handleMouseDown2

gameTimer = setInterval(updateTime, 1000);

function updateTime() {
	gameTime += 1;
  if (gameTime > 25) {
    console.log('25 mores');
    batEnemytwo()
  }
  if (gameTime > 40) {
    batEnemythree()
    console.log("40 more");
  }
	if(gameTime > 60) {
		//End Game and Clean up
    viewport.removeChild(batSprite);
    viewport.removeChild(batDeath);
    timer.innerHTML = "GAME OVER";
    scoreText.innerHTML = "Your score: " + score;
    window.onmousedown = function (evt) {
      evt.stopPropagation()
    }
    clearInterval(gameTimer);
	}
	else {
    //continue timer
    document.getElementById("timer").innerHTML = "Time: " + gameTime;
	}
}

function batEnemy() {
  //create bat sprite
  batSprite.style.width = batW + "px"
  batSprite.style.height = batH + "px"
  batSprite.style.position = "absolute"
  batSprite.style.backgroundImage = Assets.batSpritesheet
  batSprite.style.visibility = "visible"
}

function batDead() {
  //create bat death
  batDeath.style.width = 192 + "px"
  batDeath.style.height = 127 + "px"
  batDeath.style.position = "absolute"
  batDeath.style.backgroundImage = Assets.batDeath
  batDeath.style.left = batSprite.style.left
  batDeath.style.top = batSprite.style.top
  // fade out
  batDeath.style.opacity = 1;
  fade()
}

function fade() {
    var fadeout = setInterval(function () {
      if (batDeath.style.opacity > 0) {
        batDeath.style.opacity -= 0.1
      // batDeath.style.display = "none";
    } else if (batDeath.style.opacity === 0) {
      clearInterval(fadeout)
    }
  },100)
    //   if (batDeath.style.opacity > 0) {
    //     batDeath.style.opacity -= 0.01
    //   // batDeath.style.display = "none";
    // } else {
    //   requestAnimationFrame(fade);
    // }
}

function tickEvent() {
  console.log("LOOPING");
	//Make sure enemy bat is within game boundaries and move enemy Bat
	if(enemyXPos < (WIDTH - batW) && enemyXPos > 0) {
		enemyXPos += enemyXSpeed
	} else {
    // reverse bat direction
		enemyXSpeed = enemyXSpeed * (-1);
		enemyXPos += enemyXSpeed;
	}
	if(enemyYPos < (HEIGHT - batH) && enemyYPos > 0) {
		enemyYPos += enemyYSpeed;
	} else {
    //reverse bat direction
		enemyYSpeed = enemyYSpeed * (-1);
		enemyYPos += enemyYSpeed;
	}
  batSprite.style.left = enemyXPos + "px"
  batSprite.style.top = enemyYPos + "px"

  requestAnimationFrame(tickEvent)
}

function tickEvent1() {
	//Make sure enemy bat is within game boundaries and move enemy Bat
	if(enemyXPos1 < (WIDTH - batW) && enemyXPos1 > 0) {
		enemyXPos1 += enemyXSpeed1
	} else {
    // reverse bat direction
		enemyXSpeed1 = enemyXSpeed1 * (-1);
		enemyXPos1 += enemyXSpeed1;
	}
	if(enemyYPos1 < (HEIGHT - batH) && enemyYPos1 > 0) {
		enemyYPos1 += enemyYSpeed1;
	} else {
    //reverse bat direction
		enemyYSpeed1 = enemyYSpeed1 * (-1);
		enemyYPos1 += enemyYSpeed1;
	}

  batSpriteTwo.style.left = enemyXPos1 + "px"
  batSpriteTwo.style.top = enemyYPos1 + "px"

  requestAnimationFrame(tickEvent1)
}

function tickEvent2() {
	//Make sure enemy bat is within game boundaries and move enemy Bat
	if(enemyXPos2 < (WIDTH - batW) && enemyXPos2 > 0) {
		enemyXPos2 += enemyXSpeed2
	} else {
    // reverse bat direction
		enemyXSpeed2 = enemyXSpeed2 * (-1);
		enemyXPos2 += enemyXSpeed2;
	}
	if(enemyYPos2 < (HEIGHT - batH) && enemyYPos2 > 0) {
		enemyYPos2 += enemyYSpeed2
	} else {
    //reverse bat direction
		enemyYSpeed2 = enemyYSpeed2 * (-1);
		enemyYPos2 += enemyYSpeed2;
	}
  batSpriteThree.style.left = enemyXPos2 + "px"
  batSpriteThree.style.top = enemyYPos2 + "px"

  requestAnimationFrame(tickEvent2)
  }

// function handleMouseMove(event) {
//     //Offset the position by 45 pixels so mouse is in center of crosshair
//     var mouseX = 20
//     var mouseY = 10
//     crossHair.style.left = event.pageX + "px"
//     console.log(event.pageX);
//     crossHair.style.top = event.pageY + "px"
// }

function handleMouseDown(event) {
    //Display CrossHair

    //Increase speed of enemy slightly
    enemyXSpeed += 0.50
    enemyYSpeed += 0.50

    //Obtain Shot position
    var shotX = Math.round(event.clientX)
    var shotY = Math.round(event.clientY)
    var spriteX = Math.round(parseInt(batSprite.style.left)) //left position of flying bat
    var spriteY = Math.round(parseInt(batSprite.style.top)) //top position of flying bat

    // Compute the X and Y distance using absolute value
    var distX = Math.abs(shotX - spriteX);
    var distY = Math.abs(shotY - spriteY);

    // Anywhere in the body or head is a hit - but not the wings
    if(distX < 140 && distY < 70 ) {
    	//Hit
    	batSprite.style.visibility = "hidden"
      batDead();
    	score += 100;
      scoreText.innerHTML = "1UP: " + score;
    	//Create new enemy
    	var timeToCreate = Math.floor((Math.random()*3500)+1); //1 to 3.5 seconds
	    setTimeout(function() {
        batEnemy()
      },timeToCreate);

      //Make it harder next time
      enemyXSpeed += 0.5;
      enemyYSpeed += 0.5;

    } else {
    	//Miss
    	score -= 40;
      scoreText.innerHTML = "DOWN: " + score;
    }
}

function handleMouseDown1(event) {
    //Display CrossHair

    //Increase speed of enemy slightly
    enemyXSpeed1 += 0.50
    enemyYSpeed1 += 0.50

    //Obtain Shot position
    var shotXO = Math.round(event.clientX)
    var shotYO = Math.round(event.clientY)
    var spriteXO = Math.round(parseInt(batSpriteTwo.style.left)) //left position of flying bat
    var spriteYO = Math.round(parseInt(batSpriteTwo.style.top)) //top position of flying bat

    // Compute the X and Y distance using absolute value
    var distXO = Math.abs(shotXO - spriteXO);
    var distYO = Math.abs(shotYO - spriteYO);

    // Anywhere in the body or head is a hit - but not the wings
    if(distXO < 140 && distYO < 70 ) {
    	//Hit
    	batSpriteTwo.style.visibility = "hidden"
      batDead();
    	score += 100;
      scoreText.innerHTML = "1UP: " + score;
    	//Create new enemy
    	var timeToCreate = Math.floor((Math.random()*3500)+1); //1 to 3.5 seconds
	    setTimeout(function() {
        batEnemytwo()
      },timeToCreate);

      //Make it harder next time
      enemyXSpeed1 += 0.5;
      enemyYSpeed1 += 0.5;

    } else {
    	//Miss
    	score -= 40;
      scoreText.innerHTML = "DOWN: " + score;
    }
}

function handleMouseDown2(event) {
    //Display CrossHair

    //Increase speed of enemy slightly
    enemyXSpeed2 += 0.50
    enemyYSpeed2 += 0.50

    //Obtain Shot position
    var shotXT = Math.round(event.clientX)
    var shotYT = Math.round(event.clientY)
    var spriteXT = Math.round(parseInt(batSpriteThree.style.left)) //left position of flying bat
    var spriteYT = Math.round(parseInt(batSpriteThree.style.top)) //top position of flying bat

    // Compute the X and Y distance using absolute value
    var distXT = Math.abs(shotXT - spriteXT);
    var distYT = Math.abs(shotYT - spriteYT);

    // Anywhere in the body or head is a hit - but not the wings
    if(distXT < 140 && distYT < 70 ) {
    	//Hit
    	batSpriteThree.style.visibility = "hidden"
      batDead();
    	score += 100;
      scoreText.innerHTML = "1UP: " + score;
    	//Create new enemy
    	var timeToCreate = Math.floor((Math.random()*3500)+1); //1 to 3.5 seconds
	    setTimeout(function() {
        batEnemythree()
      },timeToCreate);

      //Make it harder next time
      enemyXSpeed2 += 0.5;
      enemyYSpeed2 += 0.5;

    } else {
    	//Miss
    	score -= 40;
      scoreText.innerHTML = "DOWN: " + score;
    }
}

function batEnemytwo() {
  console.log('new bat');
  batSpriteTwo.style.width = batW + "px"
  batSpriteTwo.style.height = batH + "px"
  batSpriteTwo.style.position = "absolute"
  batSpriteTwo.style.backgroundImage = Assets.batSpritesheet
  batSpriteTwo.style.visibility = "visible"
}

function batEnemythree() {
  batSpriteThree.style.width = batW + "px"
  batSpriteThree.style.height = batH + "px"
  batSpriteThree.style.position = "absolute"
  batSpriteThree.style.backgroundImage = Assets.batSpritesheet
  batSpriteThree.style.visibility = "visible"
}

function addMoreBat() {
  console.log('add more');
  if (gameTime > 25) {
    console.log('25 mores');
    console.log(gameTime);
    batEnemytwo()
  } else if (gameTime > 40) {
    batEnemythree()
  }
}

addMoreBat()
