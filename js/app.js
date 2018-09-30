
const score = document.querySelector('.score');
const lives = document.querySelector('.lives');
const playAgain = document.querySelector('.play-again');
let scoreCount = 0;
let livesCount = 5;
let gameOver = false; 

// Enemies our player must avoid
const Enemy = function(horizontalPosition, vertiacalPosition, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.horizontalPosition = horizontalPosition;
    this.vertiacalPosition = vertiacalPosition;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.horizontalPosition += this.speed * dt;

    // when off canvas, reset position of enemy to move across again
    if (this.horizontalPosition > 550) {
        this.horizontalPosition = -100;
        this.speed = 120 + Math.floor(Math.random() * 312);
    }

    // Check for collision between player and enemies
    if (player.horizontalPosition < this.horizontalPosition + 60 &&
        player.horizontalPosition + 37 > this.horizontalPosition &&
        player.vertiacalPosition < this.vertiacalPosition + 25 &&
        30 + player.vertiacalPosition > this.vertiacalPosition)
        {
            player.horizontalPosition = 200;
            player.vertiacalPosition = 380;
            if(livesCount > 1) {
                   livesCount -- ;
                   lives.innerHTML = `${livesCount}`;   
            }else {
                    document.querySelector('.congrats-score').innerHTML = `${scoreCount}`;
                    document.querySelector('.winner').style.visibility = `visible`;
                    document.querySelector('.congrats').style.visibility = `visible`;
                    playAgain.focus();
                    gameOver = true;
                }
        }
                           
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.horizontalPosition, this.vertiacalPosition);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function(horizontalPosition, vertiacalPosition, speed) {
    this.horizontalPosition = horizontalPosition;
    this.vertiacalPosition = vertiacalPosition;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    // Prevent player from moving beyond canvas wall boundaries
    this.vertiacalPosition < 380 || (this.vertiacalPosition = 380);
    this.horizontalPosition < 400 || (this.horizontalPosition = 400);
    this.horizontalPosition > 0 || (this.horizontalPosition = 0);

    // Check for player reaching top of canvas and winning the game
    if (this.vertiacalPosition < 0) {
        this.horizontalPosition = 200;
        this.vertiacalPosition = 380;
        scoreCount += 5;
        score.innerHTML = `${scoreCount}`;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.horizontalPosition, this.vertiacalPosition);
};

Player.prototype.handleInput = function(keyPress) {
    if (!gameOver){
        switch (keyPress) {
            case 'left':
                this.horizontalPosition -= this.speed + 50;
                break;
            case 'up':
                this.vertiacalPosition -= this.speed + 30;
                break;
            case 'right':
                this.horizontalPosition += this.speed + 50;
                break;
            case 'down':
                this.vertiacalPosition += this.speed + 30;
                break;
        }

    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [];

const enemyRoutes = [60, 140, 220];   // Array with routes that contain the vertical positioning of the Enemies
const player = new Player(200, 380, 50);
let enemy;

enemyRoutes.forEach(route => { 
    enemy = new Enemy(0, route, 150 + Math.floor(Math.random() * 400));
    allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', event  => { 
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[event.keyCode]);
});

//Function that restarts the game once the Play again button is clicked

playAgain.addEventListener('click', ()=> window.location.reload());