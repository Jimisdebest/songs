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
    artist: "Temu Opa",
    file: "Temu Opa - Ajajippie Edit.mp3",
    cover: "boe.png"
  },
  {
    title: "Juf Nikki",
    artist: "Onbekend",
    file: "Juf Nikki.mp3",
    cover: "boe.png"
  },
  {
    title: "Juf Nikki (Remix)",
    artist: "Onbekend",
    file: "Juf Nikki (Remix).mp3",
    cover: "boe.png"
  }
];

let currentIndex = -1;

const songList = document.getElementById("songList");
const searchInput = document.getElementById("searchInput");
const mainPlayer = document.getElementById("mainPlayer");
const nowPlaying = document.getElementById("nowPlaying");
const feedList = document.getElementById("feedList");
const shuffleBtn = document.getElementById("shuffleBtn");
const likeSound = document.getElementById("likeSound");

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
          <a class="download" href="${track.file}" download>📥 Download</a>
          <button class="like">❤️ Like</button>
        </div>
      `;
      songDiv.querySelector(".like").onclick = (e) => {
        e.stopPropagation();
        likeSound.play();
        addToFeed(track.artist, track.title, "❤️ Geliked");
      };
      songDiv.onclick = () => playTrack(index);
      songList.appendChild(songDiv);
    });
}

function playTrack(index) {
  currentIndex = index;
  const track = tracks[index];
  mainPlayer.src = track.file;
  mainPlayer.play();
  nowPlaying.innerHTML = `🎧 Nu speelt: <strong>${track.artist} – ${track.title}</strong>`;
  addToFeed(track.artist, track.title, "▶️ Afgespeeld");
}

function addToFeed(artist, title, action) {
  const li = document.createElement("li");
  li.textContent = `${action} ${artist} – ${title} om ${new Date().toLocaleTimeString()}`;
  feedList.prepend(li);
}

mainPlayer.addEventListener("ended", () => {
  if (currentIndex + 1 < tracks.length) {
    playTrack(currentIndex + 1);
  } else {
    nowPlaying.innerHTML = `🎧 Nu speelt: <strong>Playlist afgelopen</strong>`;
  }
});

searchInput.addEventListener("input", () => {
  renderTracks(searchInput.value);
});

shuffleBtn.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * tracks.length);
  playTrack(randomIndex);
});

renderTracks();
