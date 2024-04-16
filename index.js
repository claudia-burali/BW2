let playlistContainer = document.getElementById("playlist");
const playlistIds = [
  5714797982, 4332995842, 3439773242, 1950386602, 1306931615, 4485213484,
  1419215845, 4503967722, 3428639822, 7973829562, 1402845615, 8212241962,
];
const URL_PLAYLIST_BASE = "https://deezerdevs-deezer.p.rapidapi.com/playlist/";

const fetchPlaylist = (playlistId) => {
  const URL_PLAYLIST = URL_PLAYLIST_BASE + playlistId;

  fetch(URL_PLAYLIST, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "6f35a7534dmsh170a35a7f1e9982p1897d8jsn7cd6556a179e",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errore nella richiesta HTTP");
      }
      return response.json();
    })
    .then((playlist) => {
      console.log("Playlist aggiunta con successo:", playlist);
      let ULplaylist = document.createElement("ul");
      let namePlaylist = document.createElement("li");
      namePlaylist.innerText = playlist.description;

      ULplaylist.appendChild(namePlaylist);
      playlistContainer.appendChild(ULplaylist);
    })
    .catch((error) => {
      console.error("Errore:", error);
    });
};

const playlist = () => {
  playlistIds.forEach((playlistId) => {
    fetchPlaylist(playlistId);
  });
};

window.onload = () => {
  playlist();
};
