var viewport;
var batSprite
var crossHair
var scoreText
var timer
var WIDTH = 900;
var HEIGHT = 676;
var batW = 192;
var batH = 117;
// var enemyXPos=50; // enemy X start position
// var enemyYPos=50; // enemy Y start position
// var enemyXSpeed = 1.25; //original 1.55
// var enemyYSpeed = 1.55; //original 1.75
var score = 0;
var gameTimer;
var gameTime = 0;
var counter = 0;
var batOne
var batTwo
var batThree
var batArray = []
var replacement

Assets = {
  backgroundImage: "url(assets/background.png)",
  crossHair: "url(assets/crosshair.png)",
  batSpritesheet: "url(assets/batSpritesheet.png)",
  batDeath: "url(assets/batDeath.png)",
}

viewport = document.getElementById("container")
batSprite = document.getElementById("flyingBat")
batDeath = document.getElementById("batDeath")
crossHair = document.getElementById("shoot")
scoreText = document.getElementById("score")
timer = document.getElementById("timer")


window.onload = function() {
  console.log(event.clientX)
  //load background
  viewport.style.width = WIDTH + "px"
  viewport.style.height = HEIGHT + "px"
  viewport.style.position = "relative"
  viewport.style.backgroundImage = Assets.backgroundImage
  viewport.style.backgroundSize = "contain"

  //create bat sprite
  batOne = new Createbat(0)
  batArray.push(batOne)
  //load timer
  gameTimer = setInterval(updateTime, 1000);

  //move the bat
  requestAnimationFrame(batOne.move.bind(batOne))
}

viewport.onmousemove = function () {
  crossHair.style.left = event.pageX-50 + "px"
  crossHair.style.top = event.pageY-50 + "px"
}

window.onmousedown = function (event) {
  // if (counter === 1) {
  //   var otherFunction = handleMouseDown.bind(replacement)
  //   otherFunction(event)
  // }
  var someFunction = handleMouseDown.bind(batArray)
  someFunction(event)
}


function updateTime() {
	gameTime += 1;
	if(gameTime > 60) {
		//End Game and Clean up
    // viewport.removeChild(batone)
    // viewport.removeChild(batDeath)
    [].forEach.call(document.querySelectorAll('.batSprite'), function (el) {
      el.style.visibility = "hidden"
    })
    timer.innerHTML = "GAME OVER";
    scoreText.innerHTML = "Your score: " + score;
    window.onmousedown = function (evt) {
      evt.stopPropagation()
    }
    clearInterval(gameTimer);
	} else {
    //continue timer
    document.getElementById("timer").innerHTML = "Time: " + gameTime;
	}
}


function Createbat(name) {
  this.parent = viewport
  this.element = document.createElement("div")
  this.element.className = 'batSprite '+name
  // this.element.setAttribute('id', 'batDeath')
  // this.style = this.element.style
  this.element.style.width = batW + "px"
  this.element.style.height = batH + "px"
  this.element.style.position = "absolute"
  this.element.style.backgroundImage = Assets.batSpritesheet
  this.enemyXPos = Math.round(Math.random()*(WIDTH-batW))
  this.enemyYPos = Math.round(Math.random()*(HEIGHT-batH))
  this.enemyXSpeed = ((Math.random()*0.99)+1)
  this.enemyYSpeed = ((Math.random()*0.99)+1)
  // this.element.style.left = this.enemyXPos + "px"
  // this.element.style.top = this.enemyYPos + "px"
  this.parent.appendChild(this.element)
  this.move = function () {
    // console.log("LOOPING");
    // console.log(this);
    if(this.enemyXPos < (WIDTH - batW) && this.enemyXPos > 0) {
      this.enemyXPos += this.enemyXSpeed
    } else {
      // reverse bat direction
      this.enemyXSpeed = this.enemyXSpeed * (-1);
      this.enemyXPos += this.enemyXSpeed;
    }
    if(this.enemyYPos < (HEIGHT - batH) && this.enemyYPos > 0) {
      this.enemyYPos += this.enemyYSpeed;
    } else {
      //reverse bat direction
      this.enemyYSpeed = this.enemyYSpeed * (-1);
      this.enemyYPos += this.enemyYSpeed;
    }
    // console.log(this.enemyXPos, this.enemyYPos, 'potato')
    this.element.style.left = this.enemyXPos + "px"
    this.element.style.top = this.enemyYPos + "px"

    requestAnimationFrame(this.move.bind(this))
  }
}


function handleMouseDown(event) {
    //Increase speed of enemy slightly
    console.log(this);
    this.enemyXSpeed += 0.50
    this.enemyYSpeed += 0.50
    console.log(event);
    //Obtain Shot position
    var shotX = Math.round(event.clientX)
    var shotY = Math.round(event.clientY)
    for (var i = 0; i < batArray.length; i++) {
      var spriteX = Math.round(parseInt(batArray[i].element.style.left)) //left position of flying bat
      var spriteY = Math.round(parseInt(batArray[i].element.style.top)) //top position of flying bat

      // Compute the X and Y distance using absolute value
      var distX = Math.abs(shotX - spriteX);
      var distY = Math.abs(shotY - spriteY);
      if (distX < 150 && distY < 150) {
        batArray[i].enemyXPos = Math.round(Math.random()*(WIDTH-batW))
        batArray[i].enemyYPos = Math.round(Math.random()*(HEIGHT-batH))
        // batDead(batArray[i])
        // console.log($(bat.element.className))
        console.log(score);
        score += 100
        scoreText.innerHTML = "SCORE: " + score
        counter ++
        if (counter < 3) {
          batArray[counter] = new Createbat(counter)
          batArray[counter].move()
          batArray.push(batArray[counter])
        }
        this.enemyXSpeed += 0.5;
        this.enemyYSpeed += 0.5;
      }
    //   else if (distX > 150 && distY > 150) {
    //   //Miss
    //   score -= 40;
    //   scoreText.innerHTML = "SCORE: " + score;
    // }
  }
}
    // var spriteX = Math.round(parseInt(this.element.style.left)) //left position of flying bat
    // var spriteY = Math.round(parseInt(this.element.style.top)) //top position of flying bat
    //
    // // Compute the X and Y distance using absolute value
    // var distX = Math.abs(shotX - spriteX);
    // var distY = Math.abs(shotY - spriteY);
    //
    // // Anywhere in the body or head is a hit - but not the wings
    // if(distX < 500 && distY < 200 ) {
    // 	//Hit
    // 	// this.element.style.visibility = "hidden"
    //   batDead();
    // 	score += 100;
    //   scoreText.innerHTML = "1UP: " + score;
    // 	//Create new enemy
    //   this.enemyXPos = Math.round(Math.random()*(WIDTH-batW))
    //   this.enemyYPos = Math.round(Math.random()*(HEIGHT-batH))
    //   counter ++
    //   if (counter < 3) {
    //     batArray[counter] = new Createbat(counter)
    //     batArray[counter].move()
    //     batArray.push(batArray[counter])
      // }
      // for (var i = 0; i < batArray.length; i++) {
        // console.log('batarray ' +' '+batArray[0].enemyXPos)
        // console.log(batArray[0].enemyXPos);
        // console.log(batArray[1].enemyXPos);
        // console.log(batArray[2].enemyXPos);
      // }
      // batOne.element.style.visibility = "hidden"
      // batOne.move()
      //Make it harder next time
    //   this.enemyXSpeed += 0.5;
    //   this.enemyYSpeed += 0.5;
    //
    // }
//     else {
//     	//Miss
//     	score -= 40;
//       scoreText.innerHTML = "DOWN: " + score;
//     }
//
// }

// function batEnemy() {
//   //create bat sprite
//   batSprite.style.width = batW + "px"
//   batSprite.style.height = batH + "px"
//   batSprite.style.position = "absolute"
//   batSprite.style.backgroundImage = Assets.batSpritesheet
//   batSprite.style.visibility = "visible"
// }

// function batDead(bat) {
//   //create bat death
//   batDeath.style.width = 192 + "px"
//   batDeath.style.height = 127 + "px"
//   batDeath.style.position = "absolute"
//   batDeath.style.backgroundImage = Assets.batDeath
//   console.log(batOne.enemyXPos);
//   batDeath.style.left = bat.enemyXPos
//   // $('#batDeath').css({left: batOne.style.lef, top: batOne.style.top})
//   batDeath.style.top = bat.enemyYPos
//   // fade out
//   batDeath.style.opacity = 1;
//   fade()
// }

// function fade() {
//     var fadeout = setInterval(function () {
//       if (batDeath.style.opacity > 0) {
//         batDeath.style.opacity -= 0.1
//       // batDeath.style.display = "none";
//     } else if (batDeath.style.opacity === 0) {
//       clearInterval(fadeout)
//     }
//   },100)
// }
// for (var i = 0; i < batArray.length; i++) {
//   console.log('batarray '+i +' '+batArray[i].enemyXPos)
// }

// function tickEvent() {
// 	//Make sure enemy bat is within game boundaries and move enemy Bat
// 	if(enemyXPos < (WIDTH - batW) && enemyXPos > 0) {
// 		enemyXPos += enemyXSpeed
// 	} else {
//     // reverse bat direction
// 		enemyXSpeed = enemyXSpeed * (-1);
// 		enemyXPos += enemyXSpeed;
// 	}
// 	if(enemyYPos < (HEIGHT - batH) && enemyYPos > 0) {
// 		enemyYPos += enemyYSpeed;
// 	} else {
//     //reverse bat direction
// 		enemyYSpeed = enemyYSpeed * (-1);
// 		enemyYPos += enemyYSpeed;
// 	}
//   batSprite.style.left = enemyXPos + "px"
//   batSprite.style.top = enemyYPos + "px"
//   requestAnimationFrame(tickEvent)
// }

// function handleMouseMove(event) {
//     //Offset the position by 45 pixels so mouse is in center of crosshair
//     var mouseX = 20
//     var mouseY = 10
//     crossHair.style.left = event.pageX + "px"
//     console.log(event.pageX);
//     crossHair.style.top = event.pageY + "px"
// }

//
// function addMoreBat() {
//   if (gameTime > 25) {
//     batEnemy()
//   } else if (gameTime > 40) {
//     batEnemy()
//     //add obstacle
//   }
// }
//
// console.log(addMoreBat()) //undefined
