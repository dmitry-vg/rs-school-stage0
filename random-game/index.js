//переменные для работы с графикой
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');


//начальные координаты мяча
let x = canvas.width / 2;
let y = canvas.height - 30;

//для смещения мяча
let dx = 2;
let dy = -2;

//радиус мяча
let ballRadius = 10;

//для создания ракетки

let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

//состояние клавиш
let rightPressed = false;
let leftPressed = false;

let speedGame = 10;


//переменные для кирпичей
let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

let brick = [];
for (let c = 0; c < brickColumnCount; c++) {
  brick[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    brick[c][r] = { x: 0, y: 0, status: 1 };

  }

}

//очки
let score = 0;



function drawBricks() { //рисуем кирпичи
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (brick[c][r].status == 1) {
        let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
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

function drawPaddle() {//ракетка
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function draw() { //передвижение мяча
  ctx.clearRect(0, 0, canvas.width, canvas.height); //очистка от предыдущей отрисовки
  drawBall();
  drawPaddle();
  drawBricks();
  collisionDetection();
  drawScore();
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy

    } else {
      alert("Game Over\n" + 
      'Score: ' + score);
      document.location.reload();
      clearInterval(interval);
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
}

//слушаем событие нажатия и отпускания кнопки, выполняем функции
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

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
function mouseMoveHandler(e){
  let relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width){
    paddleX = relativeX - paddleWidth / 2;
  }
}

function collisionDetection() { //отталкиваемся от кирпича
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      let b = brick[c][r];
      if (b.status == 1) {
        if (x > b.x &&
          x < b.x + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          dy = -dy;
          b.status = 0;
          score++;
          if (score == brickRowCount * brickColumnCount) {
            alert("YOU WIN, CONGRATULATIONS!\n" + 
            'Score: ' + score);
            document.location.reload();
          }
        }
      }

    }
  }
}

function drawScore() {
  ctx.font = '16px Arial';
  ctx.fillStyle = "#0095DD";
  ctx.fillText('Score: ' + score, 8, 20);
}

let interval = setInterval(draw, speedGame);