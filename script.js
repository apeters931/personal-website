
// nav 
const hamMenu = document.querySelector(".ham-menu");

const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
});

const img = document.querySelector(".img");
var header = document.getElementById("header");

img.addEventListener("click", () => {
    board.classList.remove("hide-objects");
    header.classList.add("hide-objects");
    main();
});

function main() {
    var board = document.getElementById("board");

    //board
    let boardWidth = 850;
    let boardHeight = 400;
    let context;

    //dino
    let dinoWidth = 120;
    let dinoHeight = 210;
    let dinoX = 50;
    let dinoY = boardHeight - dinoHeight;
    let dinoImg;
    let dino1;
    let dino2;
    let dinoType = '1'

    //speech bubble
    let speecBubbleImg;
    let speechBubbleLoretta;
    let speechBubbleFranny;
    let speechBubblePiccadilly;

    let dino = {
        x : dinoX,
        y : dinoY,
        width : dinoWidth,
        height : dinoHeight
    }

    //cactus
    let cactusArray = [];

    let cactus1Width = 100;
    let cactus2Width = 100;
    let cactus3Width = 135;

    let cactusHeight = 100;
    let cactusX = 700;
    let cactusY = boardHeight - cactusHeight;

    let cactus1Img;
    let cactus2Img;
    let cactus3Img;

    // game over
    let gameOverImg;
    let replayImg;

    //physics
    let velocityX = -10; //cactus moving left speed
    let velocityY = 0;
    let gravity = .6;

    let gameOver = false;
    let playAgain = false;
    let wasClicked;
    let score = 0;


    board.height = boardHeight;
    board.width = boardWidth;

    context = board.getContext("2d"); //used for drawing on the board

    //draw initial dinosaur
    // context.fillStyle="green";
    // context.fillRect(dino.x, dino.y, dino.width, dino.height);

    dino1 = new Image();
    dino1.src = "./img/player.png";

    dino2 = new Image();
    dino2.src = "./img/player2.png";

    speechBubbleLoretta = new Image();
    speechBubbleLoretta.src = "./img/speechBubbleLoretta.png";

    speechBubbleFranny = new Image();
    speechBubbleFranny.src = "./img/speechBubbleFranny.png";

    speechBubblePiccadilly = new Image();
    speechBubblePiccadilly.src = "./img/speechBubblePiccadilly.png";

    cactus1Img = new Image();
    cactus1Img.src = "./img/loretta.png";

    cactus2Img = new Image();
    cactus2Img.src = "./img/franny.png";

    cactus3Img = new Image();
    cactus3Img.src = "./img/pickle.png";

    gameOverImg = new Image();
    gameOverImg.src = "./img/game-over.png";

    replayImg = new Image();
    replayImg.src = "./img/reset.png";

    requestAnimationFrame(update);
    setInterval(placeDino, 200); //1000 milliseconds = 1 second
    setInterval(placeCactus, 1000); //1000 milliseconds = 1 second
    document.addEventListener("keydown", moveDino);



    function update() {
        requestAnimationFrame(update);
        if (gameOver) {
            return;
        }
        context.clearRect(0, 0, board.width, board.height);

        //dino
        velocityY += gravity;
        dino.y = Math.min(dino.y + velocityY, dinoY); //apply gravity to current dino.y, making sure it doesn't exceed the ground
        context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);

        //cactus
        for (let i = 0; i < cactusArray.length; i++) {
            let cactus = cactusArray[i];
            cactus.x += velocityX;
            context.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height);

            if (detectCollision(dino, cactus)) {
                gameOver = true;
                if (cactus.type == 'loretta') {
                    speecBubbleImg = speechBubbleLoretta;
                }
                else if (cactus.type == 'franny') {
                    speecBubbleImg = speechBubbleFranny;
                }
                else {
                    speecBubbleImg = speechBubblePiccadilly;
                }
                context.drawImage(speecBubbleImg, dino.x + 50, dino.y - 70, 210, 100);
                if (dino.y == dinoY) {
                    context.drawImage(gameOverImg, 240, 30);
                }
                else {
                    context.drawImage(gameOverImg, 240, 150);
                }
                context.drawImage(replayImg, 390, 200);
                board.addEventListener("click", wasClicked, true);
                if (wasClicked) {
                    console.log("true")
                };
                board.addEventListener("click", function(){
                    console.log("test")
                    playAgain = true;
                    if (playAgain) {
                        main();
                    };
                });
            }
        }

        //score
        context.fillStyle="black";
        context.font="30px courier";
        score++;
        context.fillText(score,  5, 30);
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
            y : cactusY,
            width : null,
            height: cactusHeight,
            type: null
        }

        let placeCactusChance = Math.random(); //0 - 0.9999...

        if (placeCactusChance > .90) { //10% you get cactus3
            cactus.img = cactus3Img;
            cactus.type = 'piccadilly';
            cactus.width = cactus3Width;
            cactusArray.push(cactus);
        }
        else if (placeCactusChance > .70) { //30% you get cactus2
            cactus.img = cactus2Img;
            cactus.type = 'franny';
            cactus.width = cactus2Width;
            cactusArray.push(cactus);
        }
        else if (placeCactusChance > .50) { //50% you get cactus1
            cactus.img = cactus1Img;
            cactus.type = 'loretta';
            cactus.width = cactus1Width;
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
}