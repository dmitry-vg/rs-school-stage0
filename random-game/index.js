//переменные для работы с графикой
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');



var bumpAudio = document.getElementById('bump-audio');


//радиус мяча
var ballRadius = 10;

//для создания ракетки

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

//начальные координаты мяча
var x = canvas.width / 2;
var y = canvas.height - 20;
//для смещения мяча
var dx = 0;
var dy = 0;

//состояние клавиш
var rightPressed = false;
var leftPressed = false;
var spacePressed = false;




//переменные для кирпичей
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var brick = [];
for (var c = 0; c < brickColumnCount; c++) {
  brick[c] = [];
  for (var r = 0; r < brickRowCount; r++) {
    brick[c][r] = { x: 0, y: 0, status: 1 };

  }

}

//очки
var score = 0;
var totalScore = 0;

var lives = 3

var level = 0;



function drawBricks() { //рисуем кирпичи
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      if (brick[c][r].status == 1) {
        var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
        brick[c][r].x = brickX;
        brick[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "0095DD";
        ctx.fill();
        ctx.closePath();
      }

    }
  }
}

function drawBall() { //рисуем мяч
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {//рисует ракетку
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function draw() { //сама игра
  ctx.clearRect(0, 0, canvas.width, canvas.height); //очистка от предыдущей отрисовки
  drawBall();
  drawPaddle();
  drawBricks();
  collisionDetection();
  drawScore();
  drawLives();
  drawLevel()
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
      racketBump();

    } else {
      lives--;
      if (!lives) {
        alert("Game Over\n" +
          'Score: ' + totalScore);
        document.location.reload();

      } else {
        //стартовая позиция
        x = canvas.width / 2;
        y = canvas.height - 20;
        dx = 0;
        dy = 0;
        paddleX = (canvas.width - paddleWidth) / 2;
      }

    }

  }
  x += dx;
  y += dy;


  //перемещаем ракетку
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  requestAnimationFrame(draw);
}

//звуки
function racketBump() {
  bumpAudio.src = "./assets/audio/racket.mp3";
}
function brickBump() {
  bumpAudio.src = "./assets/audio/brick.mp3";
}
//слушаем событие нажатия и отпускания кнопки, выполняем функции
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('keydown', startGame, false);

function keyDownHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = true;
  } else if (e.keyCode == 37) {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = false;
  } else if (e.keyCode == 37) {
    leftPressed = false;
  }
}

document.addEventListener("mousemove", mouseMoveHandler, false);
function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

//функция старта игры
function startGame(e) {
  if (e.keyCode == 32) {
    dx = 3 + level;
    dy = -3 - level;
  }

}


function collisionDetection() { //отталкиваемся от кирпича
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      var b = brick[c][r];
      if (b.status == 1) {
        if (x > b.x &&
          x < b.x + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          dy = -dy;
          b.status = 0;
          brickBump();
          score++;
          totalScore++
          if (score == brickRowCount * brickColumnCount) {
            // alert("YOU WIN, CONGRATULATIONS!\n" + 
            // 'Score: ' + score);
            score = 0;
            lives++;
            level++
            x = canvas.width / 2;
            y = canvas.height - 20;
            dx = 0;
            dy = 0;
            for (var c = 0; c < brickColumnCount; c++) {
              brick[c] = [];
              for (var r = 0; r < brickRowCount; r++) {
                brick[c][r] = { x: 0, y: 0, status: 1 };

              }

            }
            // document.location.reload(); //перезапустить игру
          }
        }
      }

    }
  }
}

function drawScore() {
  ctx.font = '16px Arial';
  ctx.fillStyle = "#0095DD";
  ctx.fillText('Score: ' + totalScore, 8, 20);
}

function drawLives() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '0095DD';
  ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}
function drawLevel() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '0095DD';
  ctx.fillText("Level: " + level , canvas.width - 275, 20);
}
draw();