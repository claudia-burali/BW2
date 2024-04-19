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
let btnPlayAlbum = document.getElementById("btnPlayAlbum");
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
  const percentage =
    ((volumeBrano.value - volumeBrano.min) /
      (volumeBrano.max - volumeBrano.min)) *
    100;
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
      namePlaylist.classList.add("cursor-pointer");
      namePlaylist.innerText = e.title;
      playlistContainer.appendChild(namePlaylist);
      playlistArray.push(e);
      namePlaylist.addEventListener("click", () => {
        window.location.href = `album.html?albumId=${e.album.id}`;
      });
    });
  })
  .catch((error) => {
    console.error("Errore:", error);
  });

const getAlbum = function (idAlbum) {
  let url = "https://deezerdevs-deezer.p.rapidapi.com/album/" + idAlbum;

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
    .then((album) => {
      console.log(album);
      let albumCover = document.getElementById("albumCover");
      albumCover.innerHTML = `
      <img style="width:250px" src="${album.cover_xl}" alt="album cover"/>`;
      let h1 = document.querySelector(".albumTitle");
      h1.innerText = album.title;
      let tracks = document.querySelector(".track");
      tracks.innerText = album.nb_tracks + " brani,";
      let duration = document.querySelector(".time");
      const durata = album.duration;
      const min = Math.floor(durata / 60);
      const sec = durata % 60;
      const durataFix = `${min} min ${sec < 10 ? "0" : ""}${sec} sec.`;
      duration.innerText = durataFix;
      const getRandomNumber = () => {
        return Math.floor(Math.random() * 25);
      };

      btnCambiaBranoSuccessivo.addEventListener("click", () => {
        const indexCasuale = getRandomNumber();
        indexBranoPrecedente.push(indexCasuale);
        const branoCasuale = album.tracks.data[indexCasuale];
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
          const indiceBranoPrecedente =
            indexBranoPrecedente[indexBranoPrecedente.length - 1];
          const branoPrecedente = album.tracks.data[indiceBranoPrecedente];
          playAudio(branoPrecedente.preview);
          svgPlay.style.display = "inline";
          svgPausa.style.display = "none";
          imgAlbumFooter.src = branoPrecedente.album.cover;
          titoloAlbumFooter.innerText = branoPrecedente.title;
          artistaAlbumFooter.innerText = branoPrecedente.artist.name;
        } else {
          const indexCasuale = getRandomNumber();
          const branoCasuale = album.tracks.data[indexCasuale];
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

const getTracks = function (albumId) {
  let url =
    "https://striveschool-api.herokuapp.com/api/deezer/album/" + albumId;
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
      let albumTracksContainer = document.querySelector(".albumTracks");
      track.tracks.data.forEach((track, i) => {
        let trackElement = createTrackList(track, i);
        trackElement.classList.add("text-light");
        albumTracksContainer.appendChild(trackElement);
        trackElement.addEventListener("click", () => {
          playAudio(track.preview);
          svgPlay.style.display = "inline";
          svgPausa.style.display = "none";
          imgAlbumFooter.src = track.album.cover_medium;
          titoloAlbumFooter.innerText = track.title;
          artistaAlbumFooter.innerText = track.artist.name;
          durataBrano.innerText = formatTime(track.duration);
        });

        btnPlayAlbum.addEventListener("click", () => {
          playAudio(track.preview);
          svgPlay.style.display = "inline";
          svgPausa.style.display = "none";
          imgAlbumFooter.src = track.album.cover_medium;
          titoloAlbumFooter.innerText = track.title;
          artistaAlbumFooter.innerText = track.artist.name;
          durataBrano.innerText = formatTime(track.duration);
        });
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
      <h5 class="titleTrack m-0">${track.title}</h5>
    </div>
    <div class="col-4 d-flex justify-content-between">
      <p>${track.rank}</p>
      <p class="durationTrack">${durationFix}</p>
    </div>
  </div>
`;

  return trackDiv;
};

window.addEventListener("DOMContentLoaded", () => {
  let params = new URLSearchParams(document.location.search);
  let albumId = params.get("albumId");
  console.log(albumId);
  getAlbum(albumId);
  getTracks(albumId);
});
