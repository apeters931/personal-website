
/*
====================
HAMBURGER NAVIGATION
====================
*/
// set hamMenu variable and offScreenMenu 
const hamMenu = document.querySelector(".ham-menu");
const offScreenMenu = document.querySelector(".off-screen-menu");
// whenever the hamburger icon gets clicked toggle the active class on and off
// off screen menu starts as the default then when clicked off-screen is removed and ham menu is activated
hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
});


/*
===================
DINOSAUR T-REX GAME
===================
*/
// create variable for main headshot on homepage
const mainHeadshotImg = document.querySelector(".img");
// create variable for the header container
var header = document.getElementById("header");
// If the headshot is clicked hide what was shown in the main header and show the dino game board
// This section is what triggers the dino game function
mainHeadshotImg.addEventListener("click", () => {
    board.classList.remove("hide-objects");
    header.classList.add("hide-objects");
    dino_game();
});

// main function for dino game
function dino_game() {
    // get board elemtent and create variable for it 
    var board = document.getElementById("board");
    // set game board width and height
    let boardWidth = 850;
    let boardHeight = 360;
    // ?
    let context;
    // set the size of the dino player
    let dinoWidth = 120;
    let dinoHeight = 210;
    // position on the road for the dino
    let dinoX = 50;
    // position of the top of the dino's head when standing on the road
    let dinoY = boardHeight - dinoHeight;
    let dinoImg;
    let dinoDeadImg;
    let dino1;
    let dinoDead1;
    let dino2;
    let dinoDead2;
    let dinoType = '1'
    //speech bubble
    let speecBubbleImg;
    let speechBubbleLoretta;
    let speechBubbleFranny;
    let speechBubblePiccadilly;
    // dino values
    let dino = {
        x : dinoX,
        y : dinoY,
        width : dinoWidth,
        height : dinoHeight
    }
    // cactus
    // array cacti will be added to, to get placed
    let cactusArray = [];
    // size of loretta's image
    let lorettaWidth = 135;
    let lorettaHeight = 63;
    // size of franny's image
    let frannyWidth = 135;
    let frannyHeight = 63;
    let cactus3Width = 200;
    let cactus3Height = 91;
    let cactusX = 700;
    let cactus1Y = boardHeight - lorettaHeight;
    let cactus2Y = boardHeight - frannyHeight;
    let cactus3Y = boardHeight - cactus3Height;
    let cactus1Img;
    let cactus2Img;
    let cactus3Img;
    // game over
    let gameOverImg;
    let replayImg;
    // physics
    // cactus moving left speed
    let velocityX = -10;
    let velocityY = 0;
    let gravity = .6;
    let gameOver = false;
    let wasClicked;
    let clickCount = 0;
    let score = 0;
    // string version of the score that appears on the board with leading zeros
    let display_score;

    board.height = boardHeight;
    board.width = boardWidth;
    // used for drawing on the board
    context = board.getContext("2d");

    dino1 = new Image();
    dino1.src = "./img/player.png";

    dino2 = new Image();
    dino2.src = "./img/player2.png";

    dinoDead = new Image();
    dinoDead.src = "./img/playerDead.png";

    dinoDead2 = new Image();
    dinoDead2.src = "./img/Player2Dead.png";

    speechBubbleLoretta = new Image();
    speechBubbleLoretta.src = "./img/speechBubbleLoretta.png";

    speechBubbleFranny = new Image();
    speechBubbleFranny.src = "./img/speechBubbleFranny.png";

    speechBubblePiccadilly = new Image();
    speechBubblePiccadilly.src = "./img/speechBubblePiccadilly.png";

    cactus1Img = new Image();
    cactus1Img.src = "./img/loretta2.png";

    cactus2Img = new Image();
    cactus2Img.src = "./img/franny1.png";

    cactus3Img = new Image();
    cactus3Img.src = "./img/cats4.png";

    gameOverImg = new Image();
    gameOverImg.src = "./img/game-over.png";

    replayImg = new Image();
    replayImg.src = "./img/reset.png";

    requestAnimationFrame(update);
    // 1000 milliseconds = 1 second
    setInterval(placeDino, 200);
    // 1000 milliseconds = 1 second
    setInterval(placeCactus, 800);
    document.addEventListener("keydown", moveDino);

    function update() {
        requestAnimationFrame(update);
        if (gameOver) {
            return;
        }
        context.clearRect(0, 0, board.width, board.height);

        velocityY += gravity;
        // apply gravity to current dino.y, making sure it doesn't exceed the ground
        dino.y = Math.min(dino.y + velocityY, dinoY);
        context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);

        // cactus
        for (let i = 0; i < cactusArray.length; i++) {
            let cactus = cactusArray[i];
            cactus.x += velocityX;
            context.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height);

            if (detectCollision(dino, cactus)) {
                gameOver = true;
                if (dinoType == '1') {
                    dinoDeadImg = dinoDead
                }
                else {
                    dinoDeadImg = dinoDead2
                }
                context.drawImage(dinoDeadImg, dino.x, dino.y, dino.width, dino.height)
                // draw gameover and replay screen
                context.drawImage(gameOverImg, 240, 110);
                context.drawImage(replayImg, 390, 160);
                
            }
        }
        // score ticker
        // style to fill
        context.fillStyle="black";
        // font
        context.font="30px courier";
        // increment score by 1 while game is running
        score++;
        // add leading zeros and convert to string for adding to game board
        displayScore = score.toString().padStart(6, '0');
        // print to game board in the x,y cordinates listed
        context.fillText(displayScore,  745, 30);
        // change speed as score increases
        velocityX = velocityX - 0.001;
        console.log(velocityX);

    }

    function placeDino() {
        if (gameOver) {
            return;
        }

        if (dinoType == '1' && dino.y == dinoY) {
            dinoType = '2';
            dinoImg = dino2;
        }

        else {
            dinoType = '1';
            dinoImg = dino1;
        }

        dinoImg.onload = function() {
            context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
        }
    }

    function moveDino(e) {
        if (gameOver) {
            return;
        }

        if ((e.code == "Space" || e.code == "ArrowUp") && dino.y == dinoY) {
            dinoImg.onload = function() {
                context.drawImage(dino1, dino.x, dino.y, dinoDead1Franny, dino.height);
            }  
            //jump
            velocityY = -13.5;
        }
        else if (e.code == "ArrowDown" && dino.y == dinoY) {
            //duck
        }

    }

    function placeCactus() {
        if (gameOver) {
            return;
        }

        //place cactus
        let cactus = {
            img : null,
            x : cactusX,
            y : null,
            width : null,
            height: null,
            type: null
        }

        let placeCactusChance = Math.random(); //0 - 0.9999...

        if (placeCactusChance < .25) {
            cactus.img = cactus2Img;
            cactus.y = cactus2Y
            cactus.type = 'franny';
            cactus.width = frannyWidth;
            cactus.height = frannyHeight;
            cactusArray.push(cactus);
        }
        else if (placeCactusChance > .75) {
            cactus.img = cactus1Img;
            cactus.y = cactus1Y
            cactus.type = 'loretta';
            cactus.width = lorettaWidth;
            cactus.height = lorettaHeight;
            cactusArray.push(cactus);
        }

        if (cactusArray.length > 5) {
            cactusArray.shift(); //remove the first element from the array so that the array doesn't constantly grow
        }
    }

    function detectCollision(a, b) {
        return a.x < b.x + b.width &&   //a's top left corner doesn't reach b's top right corner
            a.x + a.width > b.x &&   //a's top right corner passes b's top left corner
            a.y < b.y + b.height &&  //a's top left corner doesn't reach b's bottom left corner
            a.y + a.height > b.y;    //a's bottom left corner passes b's top left corner
    }

    const bg = document.getElementById('board');
    let posX = 0;

    function moveBackground() {
        if (gameOver) {
            return;
        }
        posX += velocityX; // adjust speed here
        bg.style.backgroundPosition = `${posX}px 0`;
        requestAnimationFrame(moveBackground);
    }

    moveBackground();
}

// if the game board is clicked the game starts over
board.addEventListener("click", function(){
    dino_game();
});
