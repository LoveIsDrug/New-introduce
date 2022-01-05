// animation navbar
window.addEventListener("load", function () {
  const links = [...document.querySelectorAll(".menu-link")];
  links.forEach((item) => item.addEventListener("mouseenter", handleHoverLink));
  const line = document.createElement("div");
  line.className = "line-effect";
  document.body.appendChild(line);
  function handleHoverLink(event) {
    const { left, top, width, height } = event.target.getBoundingClientRect();
    const offsetBottom = 0;
    line.style.width = `${width}px`;
    line.style.left = `${left}px`;
    line.style.top = `${top + height + offsetBottom}px`;
  }

  const menu = document.querySelector(".menu");
  menu.addEventListener("mouseleave", function () {
    line.style.width = 0;
  });

const menulinks = document.querySelectorAll(".link");
const sections = document.querySelectorAll("section");

let activeLink = 0;

menulinks.forEach((link, i) => {
  link.addEventListener('click', () => {
    if(activeLink != i){
      menulinks[activeLink].classList.remove('active');
      link.classList.add('active');
      sections[activeLink].classList.remove('active');
      
      setTimeout(() => {
        activeLink = i;
        sections[i].classList.add('active');
      }, 500);
    }
  })
})
});

//Dark mode
let dark = document.getElementById("dark");

if (localStorage.getItem("theme") == null) {
  localStorage.setItem("theme", "light");
}

let localData = localStorage.getItem("theme");

if (localData == "light") {
  dark.src = "/assets/image/moon.png";
  document.body.classList.remove("dark-theme");
} else if (localData == "dark") {
  dark.src = "/assets/image/sun.png";
  document.body.classList.add("dark-theme");
}

dark.onclick = function () {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    dark.src = "/assets/image/sun.png";
    localStorage.setItem("theme", "dark");
  } else {
    dark.src = "/assets/image/moon.png";
    localStorage.setItem("theme", "light");
  }
};

//typing animation

var typed = new Typed('.type', {
  strings: ['VKU', 'QUANG NGAI'],
  typeSpeed:100,
  backSpeed: 70,
  loop: true, 
  smartBackspace: false,
});

//Music 
const song = document.getElementById("song");
const playBtn = document.querySelector(".player-inner");
const nextBtn = document.querySelector(".play-forward");
const prevBtn = document.querySelector(".play-back");
const durationTime = document.querySelector(".duration");
const ramainingTime = document.querySelector(".remaining");
const rangerBar = document.querySelector(".range");
const musicName = document.querySelector(".project__music-name");
const musicImage = document.querySelector(".project__music--thumb img");
const playRepeat = document.querySelector(".play-repeat");
const playInfinite = document.querySelector(".play-infinite");

let timer = setInterval(displayTimer, 500);
let isPlaying = true;
let indexSong = 0;
let isRepeat = false;
let isInfinite = false;

//play pause song
playBtn.addEventListener("click", playPause);

function playPause() {
  if (isPlaying) {
    song.play();
    playBtn.innerHTML = '<ion-icon name="pause"></ion-icon>';
    isPlaying = false;
    timer = setInterval(displayTimer, 500);
  } else {
    song.pause();
    playBtn.innerHTML = '<ion-icon name="play"></ion-icon>';
    isPlaying = true;
    clearInterval(timer)
  }
}

//change music
// const musics = ["NgaiNoi.mp3", "DuChoMaiVeSau.mp3", "oohJustYou.mp3"];
const musics = [
  {
    id: 1,
    title:"Dù cho mai về sau",
    File: "DuChoMaiVeSau.mp3",
    Image: "https://source.unsplash.com/random"
  },
  {
    id: 2,
    title:"Một điều mà anh rất ngại nói ra",
    File: "NgaiNoi.mp3",
    Image: "https://source.unsplash.com/random"
  },
  {
    id: 3,
    title:"Ohh Just You",
    File: "oohJustYou.mp3",
    Image: "https://source.unsplash.com/random"
  }
];

playInfinite.addEventListener("click", function(){
  if(isInfinite) {
    isInfinite = false;
    playInfinite.removeAttribute("style");
  } else {
    isInfinite = true;
    playInfinite.style.color = "#20e3b2";
  }
})

playRepeat.addEventListener("click", function(){
  if(isRepeat) {
    isRepeat = false;
    playRepeat.removeAttribute("style");
  }
  else {
    isRepeat = true;
    playRepeat.style.color = "#20e3b2";
  }
});
nextBtn.addEventListener("click", function () {
  changeSong(1);
});

prevBtn.addEventListener("click", function () {
  changeSong(-1);
});

song.addEventListener("ended", handleEndedSong);
function handleEndedSong(){
  if(isRepeat){
    isPlaying = true;
    playPause();
  } else{
    changeSong(1);
  }
}

function changeSong(dir) {
  if (dir == 1) {
    //next song
    indexSong++;
    if (indexSong >= musics.length) {
      indexSong = 0;
    }
    isPlaying = true;
  } else if (dir == -1) {
    //prev song
    indexSong--;
    if (indexSong < 0) {
      indexSong = musics.length - 1;
    }
    isPlaying = true;
  }
  init(indexSong);
  // song.setAttribute("src", `./music/${musics[indexSong].File}`);
  playPause();
}

//Display time 
function displayTimer(){
  const{duration, currentTime} = song;
  rangerBar.max = duration;
  rangerBar.value = currentTime;
  ramainingTime.textContent = formatTimer(currentTime);
  if(!duration){
    durationTime.textContent = "00:00";
  } else {
    durationTime.textContent = formatTimer(duration);
  }
}
function formatTimer(number){
  const minutes = Math.floor(number/60);
  const second = Math.floor(number - minutes *60);
  return `${minutes < 10 ? '0' + minutes: minutes}:${second < 10 ? '0' + second: second}`;
}
rangerBar.addEventListener("change", handleChangeBar);
function handleChangeBar(){
  song.currentTime = rangerBar.value;
}

function init(indexSong){
  song.setAttribute("src", `./assets/music/${musics[indexSong].File}`);
  musicImage.setAttribute("src", musics[indexSong].Image);
  musicName.textContent = musics[indexSong].title;
}

displayTimer();
init(indexSong);
