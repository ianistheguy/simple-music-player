// Song class
class Song {
  constructor(name, album, fileType) {
    this.fileName = name;
    this.album = album;
    this.fileType = fileType;
  }
}

// UI elements
const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const shuffleBtn = document.getElementById("shuffle");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const album = document.getElementById("album");
const cover = document.getElementById("cover");

let songs = [
  new Song("Alice in Chains - Down in a Hole", "Dirt", "mp3"),
  new Song("The Beatles - Come Together", "Abbey Road", "mp3"),
  new Song("Clan of Xymox - A Forest", "Kindred Spirits", "m4a"),
  new Song("Cream - White Room", "Wheels of Fire", "mp3"),
  new Song("The Cult - Bad Fun", "Electric", "mp3"),
  new Song("De La Soul - Tread Water", "3 Feet High and Rising", "mp3"),
  new Song("Green Day - Welcome to Paradise", "Dookie", "mp3"),
  new Song("Yngwie Malmsteen - Black Star", "Rising Force", "m4a"),
  new Song("Massive Attack - Black Milk", "Mezzanine", "m4a"),
  new Song("The Smiths - The Boy With the Thorn In His Side", "The Queen is Dead", "m4a"),
  new Song("Akira Yamaoka - Theme of Laura", "Silent Hill 2", "mp3")
];

let songIdx = Math.floor(Math.random()) * (songs.length - 1);

// Initially load song details into the DOM
loadSong(songs[songIdx]);

// Update song details
function loadSong(song) {

  const [songArtist, songTitle] = song.fileName.split(" - ");

  title.innerText = songTitle;
  artist.innerText = songArtist;
  album.innerText = song.album;
  audio.src = `music/${song.fileName}.${song.fileType}`;
  cover.src = `images/${song.album}.jpg`;
}

// Plays song
function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}

// Pauses song
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  playBtn.querySelector("i.fas").classList.add("fa-play");

  audio.pause();
}

// Previous song
function prevSong() {
  songIdx--;

  if (songIdx < 0) {
    songIdx = songs.length - 1;
  }

  loadSong(songs[songIdx]);

  playSong();
}

// Skip to next song
function nextSong() {
  songIdx++;

  if (songIdx > songs.length - 1) {
    songIdx = 0;
  }

  loadSong(songs[songIdx]);

  playSong();
}

// Shuffles playlist
function shuffle() {
  let currentIdx = songs.length, randomIdx;
  while (currentIdx != 0) {
    randomIdx = Math.floor(Math.random() * currentIdx);
    currentIdx--;

    [songs[currentIdx], songs[randomIdx]] = [
      songs[randomIdx], songs[currentIdx]];
  }
  return songs;
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Click on progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = Math.floor((clickX / width) * duration);
}

// Events
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
})

// Change song
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// Shuffles songs
shuffleBtn.addEventListener("click", shuffle);

// Song ends
audio.addEventListener("ended", nextSong);

// Time/song update
audio.addEventListener("timeupdate", updateProgress);

// Click on progress bar
progressContainer.addEventListener("click", setProgress);