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
  })
  .catch((error) => {
    console.error("Errore:", error);
  });

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

const getArtist = function (idArtist) {
  let url = "https://deezerdevs-deezer.p.rapidapi.com/artist/" + idArtist;

  fetch(url, {
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
      console.log(artist);
      let imgArtist = document.querySelector(".backgroundArtistImage");
      imgArtist.style.backgroundImage = `url(${artist.picture_xl})`;
      let h1 = document.querySelector(".artistName");
      h1.innerText = artist.name;
      let fans = document.querySelector(".fan");
      fans.innerText = artist.nb_fan + " ascoltatori mensili";
    })
    .catch((error) => {
      console.error(error);
    });
};

const getTracks = function (artistId) {
  let url = "https://striveschool-api.herokuapp.com/api/deezer/artist/" + artistId + "/top?limit=5";
  fetch(url, {
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
    .then((track) => {
      console.log(track.data);
      let popularTracksContainer = document.querySelector(".popularTracks");
      track.data.forEach((track, i) => {
        let trackElement = createTrackList(track, i);
        popularTracksContainer.appendChild(trackElement);
      });

      const randomIndex = () => {
        return Math.floor(Math.random() * track.data.length);
      };

      btnCambiaBranoSuccessivo.addEventListener("click", () => {
        const indexCasuale = randomIndex();
        indexBranoPrecedente.push(indexCasuale);
        const branoCasuale = track.data[indexCasuale];
        playAudio(branoCasuale.preview);
        svgPlay.style.display = "inline";
        svgPausa.style.display = "none";
        imgAlbumFooter.src = branoCasuale.album.cover;
        titoloAlbumFooter.innerText = branoCasuale.title;
        artistaAlbumFooter.innerText = branoCasuale.artist.name;
      });

      btnCambiaBranoPrecedente.addEventListener("click", () => {
        if (indexBranoPrecedente.length > 0) {
          indexBranoPrecedente.pop();
          console.log(indexBranoPrecedente);
          const indiceBranoPrecedente = indexBranoPrecedente[indexBranoPrecedente.length - 1];
          const branoPrecedente = track.data[indiceBranoPrecedente];
          playAudio(branoPrecedente.preview);
          svgPlay.style.display = "inline";
          svgPausa.style.display = "none";
          imgAlbumFooter.src = branoPrecedente.album.cover;
          titoloAlbumFooter.innerText = branoPrecedente.title;
          artistaAlbumFooter.innerText = branoPrecedente.artist.name;
        } else {
          const indexCasuale = randomIndex();
          const branoCasuale = track.data[indexCasuale];
          playAudio(branoCasuale.preview);
          svgPlay.style.display = "inline";
          svgPausa.style.display = "none";
          imgAlbumFooter.src = branoCasuale.album.cover;
          titoloAlbumFooter.innerText = branoCasuale.title;
          artistaAlbumFooter.innerText = branoCasuale.artist.name;
        }
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

const createTrackList = function (track, index) {
  let trackDiv = document.createElement("div");
  const durataInSecondi = track.duration;
  const minuti = Math.floor(durataInSecondi / 60);
  const secondi = durataInSecondi % 60;
  const durationFix = `${minuti}:${secondi < 10 ? "0" : ""}${secondi}`;

  trackDiv.innerHTML = `
  <div class="track row">
    <div class="col-8 d-flex align-items-center">
      <p class="numberTrack text-right">${index + 1}</p>
      <img src="${track.album.cover_small}" />
      <h5 class="titleTrack m-0">${track.title}</h5>
    </div>
    <div class="col-4 d-flex justify-content-between">
      <p>${track.rank}</p>
      <p class="durationTrack">${durationFix}</p>
    </div>
  </div>
`;
  trackDiv.addEventListener("click", () => {
    playAudio(track.preview);
    svgPlay.style.display = "inline";
    svgPausa.style.display = "none";
    imgAlbumFooter.src = track.album.cover;
    titoloAlbumFooter.innerText = track.title;
    artistaAlbumFooter.innerText = track.artist.name;
    durataBrano.innerText = formatTime(track.duration);
  });

  const btnArtist = document.getElementById("btnPlayArtist");
  btnArtist.addEventListener("click", () => {
    playAudio(track.preview);
    svgPlay.style.display = "inline";
    svgPausa.style.display = "none";
    imgAlbumFooter.src = track.album.cover_medium;
    titoloAlbumFooter.innerText = track.title;
    artistaAlbumFooter.innerText = track.artist.name;
    durataBrano.innerText = formatTime(track.duration);
  });

  return trackDiv;
};

window.addEventListener("DOMContentLoaded", () => {
  let params = new URLSearchParams(document.location.search);
  let artistId = params.get("artistId");
  console.log(artistId);
  getArtist(artistId);
  getTracks(artistId);
});

document.getElementById("homeIcon").addEventListener("click", function () {
  window.location.href = "index.html";
});
