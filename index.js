let albumContainer = document.getElementById("album");
const albumIds = [
  92956572, 94352652, 6899610, 620594, 299319, 13793191, 343880917, 387589567, 102128972, 10435266, 393197607,
  388425797, 1434890, 127402, 81797, 6364781, 130380032, 428115167, 74606742, 1318764, 8015598, 125584, 14879699,
  36963671, 1262269, 108444952, 10966644, 6816700,
];
const URL_ALBUM_BASE = "https://deezerdevs-deezer.p.rapidapi.com/album/";

const fetchAlbum = (albumId) => {
  const URL_ALBUM = URL_ALBUM_BASE + albumId;

  fetch(URL_ALBUM, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "285e755c43mshee6ccde0f56b047p1fd3b7jsn69d102243084",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errore nella richiesta HTTP");
      }
      return response.json();
    })
    .then((album) => {
      console.log("Album aggiunto con successo:", album);
      let albumCard = document.createElement("div");
      albumCard.classList.add("d-flex");
      albumCard.classList.add("gap-5");
      albumCard.classList.add("p-3");
      albumCard.classList.add("m-5");
      albumCard.classList.add("text-light");
      albumCard.innerHTML = ` 
  <img src=${album.cover} alt="${album.title}">
  <div> 
  <h3>${album.title}</h3> 
  <p>${album.artist.name}</p>
  </div>`;
      albumContainer.appendChild(albumCard);
    })
    .catch((error) => {
      console.error("Errore:", error);
    });
};

const album = () => {
  albumIds.forEach((albumId) => {
    fetchAlbum(albumId);
  });
};

let playlistContainer = document.getElementById("playlist");
const playlistIds = [
  5714797982, 4332995842, 3439773242, 1950386602, 1306931615, 4485213484, 1419215845, 4503967722, 3428639822,
  7973829562, 1402845615, 8212241962, 3338949242, 754776991, 6399367984, 1807219322, 10678781122, 5673128942,
  1379281715,
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
      let namePlaylist = document.createElement("li");
      namePlaylist.className = ("hiddentext", "mt-3");
      namePlaylist.innerText = playlist.description;
      playlistContainer.appendChild(namePlaylist);
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
  album();
  playlist();
};
