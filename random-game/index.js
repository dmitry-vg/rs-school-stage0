console.log('70/60 Выполнены все требования к заданию. Добавлено упралвление звуковым сопровожденем. По сравнению с демо игры добавлены уровни прохождения и увеличение сложности игры')

//переменные для работы с графикой
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

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


//выводим последние результаты
let resultTable = [];
let tbody = document.getElementById('tbody');

for (let i = 0; i < localStorage.length; i++) {
  let key = localStorage.getItem(i + 1 + ' Score');
  resultTable.unshift(key);
}
for (let i = 0; i < 10; i++) {
  let numberSequence = i + 1;
  if (resultTable[i] == undefined) {
    resultTable[i] = 0;
  }
  tbody.insertAdjacentHTML("beforeend", "<tr><td>" + numberSequence + "</td><td>" + resultTable[i] + "</td></tr>")
}



//для звука
var bumpAudio = document.getElementById('bump-audio');
var phoneMusic = document.getElementById('phone');
var controlSound = document.getElementById('sound');
var controlEffect = document.getElementById('effect');
var controlMusic = document.getElementById('music');
let itSound = false;
let itSoundPump = false;
let itMusic = false;



controlSound.addEventListener("click", function () {
  if (itSound) {
    itSound = false;
    itSoundPump = false;
    itMusic = false;
    controlSound.src = "./assets/img/sound-off.png"
    controlEffect.src = "./assets/img/sound-off.png";
    controlMusic.src = "./assets/img/sound-off.png";
    phoneMusic.src = "";
  } else {
    itSound = true;
    itSoundPump = true;
    itMusic = true;
    controlSound.src = "./assets/img/sound-on.png"
    phoneMusic.src = "./assets/audio/fon.mp3";
    controlEffect.src = "./assets/img/sound-on.png";
    controlMusic.src = "./assets/img/sound-on.png";
  }
})

controlEffect.addEventListener("click", function () {

  if (itSoundPump) {
    itSoundPump = false;
    controlEffect.src = "./assets/img/sound-off.png";
  } else {
    itSoundPump = true;
    itSound = true;
    controlSound.src = "./assets/img/sound-on.png"
    controlEffect.src = "./assets/img/sound-on.png";
  }
})

controlMusic.addEventListener("click", function () {
  if (itMusic) {
    itMusic = false;
    phoneMusic.src = "";
    controlMusic.src = "./assets/img/sound-off.png";
  } else {
    itMusic = true;
    controlMusic.src = "./assets/img/sound-on.png";
    phoneMusic.src = "./assets/audio/fon.mp3";
    itSound = true;
    controlSound.src = "./assets/img/sound-on.png"
  }
})



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
      if (itSound) {
        if (itSoundPump) {
          racketBump(); //звук удара о ракетку
        }
      }
    } else {
      lives--;
      if (!lives) {
        alert("Game Over\n" +
          'Score: ' + totalScore);
        document.location.reload();
        //сохранение результата
        var numberGame = localStorage.length + 1;
        localStorage.setItem(numberGame + ' Score', totalScore)
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
    dx = 4 + level;
    dy = -4 - level;
  }
}

function collisionDetection() {   //отталкиваемся от кирпича
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
          if (itSound) {
            if (itSoundPump) {
              brickBump(); //звук удара о кирпич
            }
          }
          score++;
          totalScore++
          if (score == brickRowCount * brickColumnCount) {
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
  ctx.fillText("Level: " + level, canvas.width - 275, 20);
}
draw();