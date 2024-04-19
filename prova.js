let volumeBrano = document.getElementById("volume");
let playBtn = document.getElementById("playBtn");
let svgPlay = document.getElementById("svgPlay");
let svgPausa = document.getElementById("svgPausa");
let btnCambiaBranoPrecedente = document.getElementById("btnCambiaBranoPrimo");
let btnCambiaBranoSuccessivo = document.getElementById("btnCambiaBranoSecondo");
let imgAlbumFooter = document.getElementById("imgAlbumFooter");
let titoloAlbumFooter = document.getElementById("titoloAlbumFooter");
let artistaAlbumFooter = document.getElementById("artistaAlbumFooter");
let tempoTrascorsoBrano = document.getElementById("tempoTrascorsoBrano");
let durataBrano = document.getElementById("durataBrano");
let indexBranoPrecedente = [];

///CONTROLLI AUDIO
let formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

let currentAudio = null;

let playAudio = (audioUrl) => {
  if (currentAudio) {
    currentAudio.pause();
  }
  currentAudio = new Audio(audioUrl);

  let volumeBrano = document.getElementById("volume").value;
  currentAudio.volume = volumeBrano;
  currentAudio.play();
  currentAudio.addEventListener("timeupdate", () => {
    tempoTrascorsoBrano.innerText = formatTime(currentAudio.currentTime);
  });
};

volumeBrano.addEventListener("input", () => {
  if (currentAudio) {
    currentAudio.volume = volumeBrano.value;
  }
  const percentage = ((volumeBrano.value - volumeBrano.min) / (volumeBrano.max - volumeBrano.min)) * 100;
  document.documentElement.style.setProperty("--percentuale", percentage + "%");
});

let pauseTime = 0;

playBtn.addEventListener("click", () => {
  if (currentAudio) {
    if (currentAudio.paused) {
      currentAudio.currentTime = pauseTime;
      currentAudio.play();
      svgPlay.style.display = "inline";
      svgPausa.style.display = "none";
    } else {
      currentAudio.pause();
      pauseTime = currentAudio.currentTime;
      svgPlay.style.display = "none";
      svgPausa.style.display = "inline";
    }
  }
});

const trackIds = [
  3091023, 2114406, 80273738, 546578, 705296152, 68772113, 1016960, 2137209917, 117580364, 1173960, 3016968, 4654895,
  3819915, 1195567, 1855563147, 1728067467, 13167071, 4638671, 105765234, 6715844, 70322132, 562774682, 2630940082,
  870116922,
];
const randomtracks = (array) => {
  array.sort(() => Math.random() - 0.5);
  return array.slice(0, 1);
};
const randomNumber = (max) => {
  return Math.floor(Math.random() * max);
};
const randomtrackArray = randomtracks(trackIds);
console.log(randomtrackArray);

const URL_track_BASE = "https://deezerdevs-deezer.p.rapidapi.com/track/";

const fetchtrack = (randomtrack) => {
  const URL_track = URL_track_BASE + randomtrack;

  fetch(URL_track, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "e23e65d97bmshc3b906327a3687ap1be94fjsn81aa82475de1",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errore nella richiesta HTTP");
      }
      return response.json();
    })
    .then((track) => {
      console.log("track aggiunto con successo:", track);
      let annuncio = document.getElementById("annuncio");
      annuncio.innerHTML = `
      <div class="col-2">
                  <div>
                    <img src="${track.album.cover_xl}" alt="album cover" class="img-fluid" />
                  </div>
                </div>
                <div class="col-8">
                  <small class="text-light">${track.album.title}</small>
                  <h2 class="text-light">${track.title}</h2>
                  <p class="text-light">${track.artist.name}</p>
                  <p class="text-light">Ascolta il nuovo singolo di ${track.artist.name}!</p>
                  <div class="d-flex align-items-center gap-2">
                    <button class="btn playbutton rounded rounded-pill px-4 text-black fw-semibold" id="btnPlayIndex">Play</button>
                    <button class="btn rounded rounded-pill px-4 btn-outline-light">Salva</button>
                    <div class="dropdown d-inline">
                      <button
                        class="btn btn-outline-light px-3"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i class="fas fa-ellipsis-h"></i>
                      </button>
                      <ul class="dropdown-menu dropdown-menu-dark">
                        <li><a class="dropdown-item" href="#">Aggiungi in coda</a></li>
                        <li><a class="dropdown-item" href="#">Vai a Radio dell'artista</a></li>
                        <li><a class="dropdown-item" href="#">Aggiungi alla playlist</a></li>
                        <li><a class="dropdown-item" href="#">Condividi</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="col-2 d-flex justify-content-end align-items-start" id="hiddenButtonContainer">
                  <button
                    class="btn annuncedbutton text-white-50 rounded rounded-pill py-1 hiddenButton fw-semibold"
                    href="#annuncio"
                  >
                    NASCONDI ANNUNCI
                  </button>
                </div>
                `;
      document.getElementById("btnPlayIndex").addEventListener("click", () => {
        playAudio(track.preview);
        svgPlay.style.display = "inline";
        svgPausa.style.display = "none";
        imgAlbumFooter.src = track.album.cover_medium;
        titoloAlbumFooter.innerText = track.title;
        artistaAlbumFooter.innerText = track.artist.name;
        durataBrano.innerText = formatTime(track.duration);
      });
    })
    .catch((error) => {
      console.error("Errore:", error);
    });
};

const track = () => {
  randomtrackArray.forEach((randomtrack) => {
    fetchtrack(randomtrack);
  });
};

let playlistContainer = document.getElementById("playlist");
const URL = "https://deezerdevs-deezer.p.rapidapi.com/search?q=pop%20playlist";
const playlistArray = [];
fetch(URL, {
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
  .then((playlist) => {
    console.log("Playlist aggiunta con successo:", playlist);
    playlist.data.forEach((e) => {
      let namePlaylist = document.createElement("li");
      namePlaylist.classList.add("mt-3");
      namePlaylist.classList.add("hiddentext");
      namePlaylist.innerText = e.title;
      playlistContainer.appendChild(namePlaylist);
      playlistArray.push(e);
    });
    randomPlaylistCard();

    btnCambiaBranoSuccessivo.addEventListener("click", () => {
      const indexCasuale = randomNumber(playlistArray.length);
      const branoCasuale = playlistArray[indexCasuale];
      playAudio(branoCasuale.preview);
      svgPlay.style.display = "inline";
      svgPausa.style.display = "none";
      imgAlbumFooter.src = branoCasuale.album.cover;
      titoloAlbumFooter.innerText = branoCasuale.title;
      artistaAlbumFooter.innerText = branoCasuale.artist.name;
    });

    btnCambiaBranoPrecedente.addEventListener("click", () => {
      const indexCasuale = randomNumber(playlistArray.length);
      const branoCasuale = playlistArray[indexCasuale];
      playAudio(branoCasuale.preview);
      svgPlay.style.display = "inline";
      svgPausa.style.display = "none";
      imgAlbumFooter.src = branoCasuale.album.cover;
      titoloAlbumFooter.innerText = branoCasuale.title;
      artistaAlbumFooter.innerText = branoCasuale.artist.name;
    });
  })
  .catch((error) => {
    console.error("Errore:", error);
  });

////VISUALIZZAZIONE RANDOM CARD PLAYLIST
const randomPlaylist = (array) => {
  array.sort(() => Math.random() - 0.5);
  return array.slice(0, 6);
};

const randomPlaylistCard = () => {
  const random = randomPlaylist(playlistArray);
  console.log(random);

  random.forEach((playlistArray) => {
    let cardDiv = document.createElement("div");
    cardDiv.innerHTML = ` <div class="col mb-3">
          <div class="card background-costum p-0">
            <div class="row g-3 align-items-center">
              <div class="col-auto">
                <img src=${playlistArray.album.cover} class="img-fluid rounded-start" alt="playlist cover" style="height:70px" />
              </div>
              <div class="col">
                <div class="card-body text-white">
                  <h5 class="card-title">${playlistArray.title} </h5>
                </div>
              </div>
            </div>
            </div>
            </div> `;
    document.getElementById("rowPlaylist").appendChild(cardDiv);
  });
};

const albumIds = [
  92956572, 94352652, 6899610, 620594, 299319, 13793191, 343880917, 387589567, 102128972, 10435266, 393197607,
  388425797, 1434890, 127402, 10966644, 137272602, 309377597, 6816700, 469682765, 560398332, 81797, 6364781, 130380032,
  428115167, 74606742, 1318764, 8015598, 125584, 14879699, 36963671, 1262269, 108444952, 10966644, 1262268, 9674822,
  1347637, 51001312, 217658902, 14581088, 6575789, 97418, 96844662, 78630952, 387946, 105611582, 6816700,
];
const randomAlbums = (array) => {
  array.sort(() => Math.random() - 0.5);
  return array.slice(0, 5);
};

const randomAlbumArray = randomAlbums(albumIds);
console.log(randomAlbumArray);

const URL_ALBUM_BASE = "https://deezerdevs-deezer.p.rapidapi.com/album/";

const fetchAlbum = (randomAlbum) => {
  const URL_ALBUM = URL_ALBUM_BASE + randomAlbum;

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
      albumCard.innerHTML = ` <div class="col mb-3">
      <div class="card shadow-sm background-costum p-3" style="height:300px">
      <img src=${album.cover_xl} alt="${album.title} class="img-fluid card-img-top">
      <div class="card-body text-white"> 
      <h3 class="card-title my-2">${album.title}</h3> 
      <p class="card-text my-2">${album.artist.name}</p>
      </div>
      </div>
      </div>`;

      albumCard.setAttribute("data-album-id", album.id);

      albumCard.addEventListener("click", () => {
        window.location.href = `album.html?albumId=${album.id}`;
      });
      document.getElementById("rowAlbum").appendChild(albumCard);
    })

    .catch((error) => {
      console.error("Errore:", error);
    });
};

const album = () => {
  randomAlbumArray.forEach((randomAlbum) => {
    fetchAlbum(randomAlbum);
  });
};

const artistIds = [
  5286, 12247, 5608864, 4868678, 176639, 534258, 532, 458, 117, 599, 1197801, 12726119, 1092125, 647650, 464, 98, 407,
  399, 58447102, 4050205, 331727, 3702, 860, 1994, 652, 848, 3037, 119, 5337922, 545, 27, 2814, 371, 931, 383, 689,
];
const randomArtists = (array) => {
  array.sort(() => Math.random() - 0.5);
  return array.slice(0, 5);
};

const randomArtistArray = randomArtists(artistIds);
console.log(randomArtistArray);

const URL_artist_BASE = "https://deezerdevs-deezer.p.rapidapi.com/artist/";

const fetchartist = (randomArtist) => {
  const URL_artist = URL_artist_BASE + randomArtist;

  fetch(URL_artist, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "e23e65d97bmshc3b906327a3687ap1be94fjsn81aa82475de1",
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
      console.log("artist aggiunto con successo:", artist);
      let artistCard = document.createElement("div");
      artistCard.innerHTML = ` <div class="col mb-3">
      <div class="card shadow-sm background-costum p-3" style="height:300px">
      <img src=${artist.picture_xl} alt="${artist.name}" class="img-fluid rounded-circle card-img-top">
      <div class="card-body text-white"> 
      <h3 class="card-title my-2">${artist.name}</h3> 
      <p class="card-text text-secondary my-2">Artista</p>
      </div>
      </div>
      </div>`;
      artistCard.setAttribute("data-artist-id", artist.id);

      artistCard.addEventListener("click", () => {
        window.location.href = `artist.html?artistId=${artist.id}`;
      });
      document.getElementById("rowArtist").appendChild(artistCard);
    })
    .catch((error) => {
      console.error("Errore:", error);
    });
};

const artist = () => {
  randomArtistArray.forEach((randomArtist) => {
    fetchartist(randomArtist);
  });
};
window.onload = () => {
  track();
  album();
  artist();
};
