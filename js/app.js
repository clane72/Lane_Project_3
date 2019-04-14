// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.move = 1;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += this.move;
  if (this.x > 500) {
  this.x = -100 * Math.floor(Math.random() * 4)+1;
} else {
  this.x+=150*dt;
}
};
/*if(this.x > ctx.canvas.width + this.width){
  this.x = -200 * Math.floor(Math.random() * 4)+1;
}*/


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
/*class Hero{
  constructor(){
    this.x = 0;
    this.y = 0;
    this.sprite = 'images/char-boy.png';
  }
  render(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

const player = new Hero();
*/
var Player = function() {
 this.sprite = 'images/char-boy.png';
 this.x = 200;
 this.y = 410;
 this.victory = false;
};
Player.prototype.update = function (dt) {
  // Collision detection - if player collides w enemy send back to original position
  for (let enemy of allEnemies) {
    let deltax = this.x - enemy.x - 15;
    let deltay = this.y - enemy.y - 20;
    let distance = Math.sqrt(deltax * deltax + deltay * deltay);
    if (distance < 56) {
      console.log('hit');
      this.y = 410;
    }
  //make so player cannot go off screen
    if (this.y > 450) {
      console.log('too far');
      this.y = 410;
      }
    if (this.x > 400) {
      console.log('too far');
      this.x = 400;
      }
      if (this.x < 0) {
        console.log('too far');
        this.x = 0;
        }
}
// Did player win
if (this.y < -20) {
//console.log('win!');
  this.y = 410;
  this.victory = true;
  }
};
Player.prototype.render = function() {
 ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (dt) {
  switch (dt) {
    case "up":
      this.y -= 84;
      break;
    case "down":
      this.y += 84;
      break;
    case "left":
      this.x -= 104;
      break;
    case "right":
      this.x += 104;
      break;

  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
//var allEnemies = [new Enemy()];
var allEnemies = [new Enemy(-200, 65), new Enemy(-150, 145), new Enemy(-100, 230)];
// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
