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
  },
  {
    song: "Касіў Ясь канюшыну",
    artist: "Песняры",
    wrapperSong: "pesnyary.webp",
    src: "Песняры - Косил Ясь конюшину.mp3"
  },
  {
    song: "God Save The Queen",
    artist: "Sex Pistols",
    wrapperSong: "sex-pistols_-_god-save-the-queen.jpg",
    src: "sex-pistols_-_god-save-the-queen.mp3"
  }
];

let numberSong = playList.length -1 ;

let audio = document.getElementById('audio');
let song = document.getElementById('song');
let artist = document.getElementById('artist');
let wrapperSong = document.getElementById('wrapper-song');
let playBtn = document.getElementById('playBtn');
let pauseBtn = document.getElementById('pauseBtn');
let trackLine = document.getElementById('track-line');
let nextBtn = document.getElementById('nextBtn');
let prevBtn = document.getElementById('prevBtn');
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
  audio.src = './assets/audio/' + playList[numTrack].src;
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
    let audioTime = Math.round(audio.currentTime);
    let audioLength = Math.round(audio.duration)
    trackLine.style.width = (audioTime * 100) / audioLength + '%';

    if (audioTime == audioLength && track < numberSong) {
        track++; 
        switchTrack(track);

    } else if (audioTime == audioLength && track >= numberSong) {
        track = 0; 
        switchTrack(track); 
    }
}, 10)
})

/*пауза*/

pauseBtn.addEventListener("click", function () {
  toggleBtn();
  audio.pause();
})

/*переключение песен*/

prevBtn.addEventListener("click", function(){
  if (track > 0) {
    track--;
    switchTrack(track);
  } else {
    track = numberSong;
    switchTrack(track);
  }
})

nextBtn.addEventListener("click", function(){
  if (track < numberSong){
    track++;
    switchTrack(track);
  } else {
    track = 0;
    switchTrack(track);
  }
})



