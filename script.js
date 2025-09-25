const tracks = [
  { title: "Tycho – Boe", description: "Rustig, mysterieus en met een eigen vibe.", file: "boe.mp3" },
  { title: "AI Track – Bellen", description: "Een experimentele AI-compositie met belgeluiden en futuristische ritmes.", file: "bellen.mp3" },
  { title: "Jim – Fouououout (Dansbeat Edit)", description: "Een dansbare remix van Jim zelf. Energie, ritme en AI vibes!", file: "fout.mp3" },
  { title: "Temu Opa – Ajajippie Edit", description: "Een vrolijke en eigenzinnige edit van Temu Opa. Perfect voor een feestje!", file: "Temu Opa - Ajajippie Edit.mp3" },
  { title: "Juf Nikki", description: "Een lieve en speelse track voor de juf.", file: "Juf Nikki.mp3" },
  { title: "Juf Nikki (Remix)", description: "Een remix met extra beats en energie!", file: "Juf Nikki (Remix).mp3" }
];

let currentIndex = -1;

const songList = document.getElementById("songList");
const searchInput = document.getElementById("searchInput");
const mainPlayer = document.getElementById("mainPlayer");
const nowPlaying = document.getElementById("nowPlaying");
const feedList = document.getElementById("feedList");

function renderTracks(filter = "") {
  songList.innerHTML = "";
  tracks
    .filter(track => track.title.toLowerCase().includes(filter.toLowerCase()))
    .forEach((track, index) => {
      const songDiv = document.createElement("div");
      songDiv.className = "song";
      songDiv.innerHTML = `
        <h2>${track.title}</h2>
        <p>${track.description}</p>
        <a class="download" href="${track.file}" download>📥 Download</a>
      `;
      songDiv.onclick = () => playTrack(index);
      songList.appendChild(songDiv);
    });
}

function playTrack(index) {
  currentIndex = index;
  const track = tracks[index];
  mainPlayer.src = track.file;
  mainPlayer.play();
  nowPlaying.innerHTML = `🎧 Nu speelt: <strong>${track.title}</strong>`;
  addToFeed(track.title);
}

function addToFeed(title) {
  const li = document.createElement("li");
  li.textContent = `▶️ ${title} afgespeeld om ${new Date().toLocaleTimeString()}`;
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

renderTracks();
