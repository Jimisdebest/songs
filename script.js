const tracks = [
  {
    title: "Boe",
    artist: "Tycho",
    file: "boe.mp3",
    cover: "boe.png"
  },
  {
    title: "Fouououout (Dansbeat Edit)",
    artist: "Jim",
    file: "fout.mp3",
    cover: "fout.png"
  },
  {
    title: "Ajajippie Edit",
    artist: "Jim",
    file: "Temu Opa - Ajajippie Edit.mp3",
    cover: "temuopa.png"
  },
  {
    title: "Juf Nikki",
    artist: "Onbekend",
    file: "Juf Nikki.mp3",
    cover: "jufnikki.png"
  },
  {
    title: "Juf Nikki (Remix)",
    artist: "Onbekend",
    file: "Juf Nikki (Remix).mp3",
    cover: "jufnikkiremix.png"
  }
];

let currentIndex = -1;

const songList = document.getElementById("songList");
const searchInput = document.getElementById("searchInput");
const mainPlayer = document.getElementById("mainPlayer");
const nowPlaying = document.getElementById("nowPlaying");
const shuffleBtn = document.getElementById("shuffleBtn");
const likeSound = document.getElementById("likeSound");

const popup = document.getElementById("popup");
const popupCover = document.getElementById("popupCover");
const popupTitle = document.getElementById("popupTitle");
const popupArtist = document.getElementById("popupArtist");

const miniPlayer = document.getElementById("miniPlayer");
const miniCover = document.getElementById("miniCover");
const miniTitle = document.getElementById("miniTitle");
const miniArtist = document.getElementById("miniArtist");
const miniToggle = document.getElementById("miniToggle");

function renderTracks(filter = "") {
  songList.innerHTML = "";
  tracks
    .filter(track =>
      track.title.toLowerCase().includes(filter.toLowerCase()) ||
      track.artist.toLowerCase().includes(filter.toLowerCase())
    )
    .forEach((track, index) => {
      const songDiv = document.createElement("div");
      songDiv.className = "song";
      songDiv.innerHTML = `
        <img src="${track.cover}" alt="${track.title} cover" />
        <div class="song-info">
          <h2>${track.title}</h2>
          <div class="artist">${track.artist}</div>
          <a class="download"
