let albumContainer = document.getElementById("album");
const albumIds = [
  92956572, 94352652, 6899610, 620594, 299319, 13793191, 343880917, 387589567,
  102128972, 10435266, 393197607, 388425797, 1434890, 127402, 81797, 6364781,
  130380032, 428115167, 74606742, 1318764, 8015598, 125584, 14879699, 36963671,
  1262269, 108444952, 10966644, 1262268, 9674822, 1347637, 51001312, 217658902,
  14581088, 6575789, 97418, 96844662, 78630952, 387946, 105611582, 6816700,
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

let artistContainer = document.getElementById("artist");
const artistIds = [
  1182, 214810, 1026, 406, 4138, 5286, 12247, 5608864, 4868678, 176639, 534258,
  532, 458, 117, 599, 1197801, 331727, 1092125, 647650, 464, 98, 407, 399, 3702,
  860, 1994, 652, 848, 3037, 119, 5337922, 545, 27, 2814, 371, 931, 383, 689,
];
const URL_ARTIST_BASE = "https://deezerdevs-deezer.p.rapidapi.com/artist/";

const fetchArtist = (artistId) => {
  const URL_ARTIST = URL_ARTIST_BASE + artistId;

  fetch(URL_ARTIST, {
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
    .then((artist) => {
      console.log("Artista aggiunto con successo:", artist);
      let artistCard = document.createElement("div");
      artistCard.classList.add("d-flex");
      artistCard.classList.add("gap-5");
      artistCard.classList.add("p-3");
      artistCard.classList.add("m-5");
      artistCard.classList.add("text-light");
      artistCard.innerHTML = ` 
  <img src=${artist.picture} alt="${artist.name}">
  <div> 
  <h3>${artist.name}</h3>
  <p>Best of ${artist.name}</p> 
  </div>`;
      artistContainer.appendChild(artistCard);
    })
    .catch((error) => {
      console.error("Errore:", error);
    });
};

const artist = () => {
  artistIds.forEach((artistId) => {
    fetchArtist(artistId);
  });
};

let playlistContainer = document.getElementById("playlist");
const playlistIds = [
  5714797982, 4332995842, 3439773242, 1950386602, 1306931615, 4485213484,
  1419215845, 4503967722, 3428639822, 7973829562, 1402845615, 8212241962,
  3338949242, 754776991, 6399367984, 1807219322, 10678781122, 5673128942,
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
      namePlaylist.classList.add("mt-3");
      namePlaylist.classList.add("hiddentext");
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
  artist();
};
