let albumContainer = document.getElementById("album");
const albumIds = [
  92956572, 94352652, 6899610, 620594, 299319, 13793191, 343880917, 387589567,
  102128972, 10435266, 393197607, 388425797, 1434890, 127402, 81797, 6364781,
  130380032, 428115167, 74606742, 1318764, 8015598, 125584, 14879699, 36963671,
  1262269, 108444952, 10966644,
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

////VISUALIZZAZIONE RANDOM CARD PLAYLIST
const randomPlaylist = (array) => {
  array.sort(() => Math.random() - 0.5);
  return array.slice(0, 6);
};

const randomPlaylistCard = () => {
  const randomIds = randomPlaylist(playlistIds);

  randomIds.forEach((playlistId) => {
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
      .then((playlistData) => {
        console.log("Playlist random:", playlistData);

        let cardDiv = document.createElement("div");
        cardDiv.innerHTML = `
        <div class="card bg-secondary p-0" style="max-width: 300px">
          <div class="row g-0">
            <div class="col-md-4">
              <img src=${playlistData.picture_small} class="img-fluid rounded-start" alt="playlist cover" />
            </div>
            <div class="col-md-8">
              <div class="card-body text-white">
                <h5 class="card-title">${playlistData.title} </h5>
              </div>
            </div>
          </div>
          </div> `;
        document.getElementById("row").appendChild(cardDiv);
      })
      .catch((error) => {
        console.error("Errore:", error);
      });
  });
};

window.onload = () => {
  album();
  playlist();
  randomPlaylistCard();
};
