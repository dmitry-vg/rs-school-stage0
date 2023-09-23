let playList = [
  {
    song: "Gosti",
    artist: "Krambambulya",
    wrapperSong: "krambambulya-gosti.jpg",
    src: "krambambulya-gosti.mp3"
  },
  {
    song: "Alivariya",
    artist: "Leibonik",
    wrapperSong: "leibonik-alvaryya.jpg",
    src: "leibonik-alvaryya.mp3"
  }
];

let audio = document.getElementById('audio');
let song = document.getElementById('song');
let artist = document.getElementById('artist');
let wrapperSong = document.getElementById('wrapper-song');
let playBtn = document.getElementById('playBtn');
let pauseBtn = document.getElementById('pauseBtn');
let trackLine = document.getElementsByClassName('track-line');
let track; // Переменная с индексом трека
 
// Событие перед загрузкой страницы
window.onload = function() {
    track = 0; // Присваиваем переменной ноль
}

/*скрыть показать кнопки паузы и проигрывания*/
function toggleBtn() {
  playBtn.classList.toggle('hidden');
  pauseBtn.classList.toggle('hidden');
}

/*функция фключения песни и замены метаданных*/
function switchTrack (numTrack) {
  // Меняем значение атрибута src
  audio.src = './assets/audio/' + playList[numTrack].song;
  wrapperSong.src = './assets/images/' + playList[numTrack].wrapperSong;
  artist.innerHTML = playList[numTrack].artist;
  song.innerHTML = playList[numTrack].song;
  // Назначаем время песни ноль
  audio.currentTime = 0;
  // Включаем песню
  audio.play();
}

/*включение песни*/
playBtn.addEventListener("click", function () {
  toggleBtn();
  audio.play();

  audioPlay = setInterval(function() {
    // Получаем значение на какой секунде песня
    let audioTime = Math.round(audio.currentTime);
    // Получаем всё время песни
    let audioLength = Math.round(audio.duration)
    // Назначаем ширину элементу time
    time.style.width = (audioTime * 100) / audioLength + '%';
    // Сравниваем, на какой секунде сейчас трек и всего сколько времени длится
    // И проверяем что переменная treck меньше четырёх
    if (audioTime == audioLength && track < 3) {
        track++; // То Увеличиваем переменную 
        switchTrack(track); // Меняем трек
    // Иначе проверяем тоже самое, но переменная treck больше или равна четырём
    } else if (audioTime == audioLength && track >= 3) {
        treck = 0; // То присваиваем treck ноль
        switchTrack(track); //Меняем трек
    }
}, 10)
})

/*пауза*/

pauseBtn.addEventListener("click", function () {
  toggleBtn();
  audio.pause();
})



