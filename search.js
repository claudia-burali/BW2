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

let containerMain = document.getElementById("containerMain");
let searchInput = document.getElementById("searchInput");
let posterContainer = document.getElementById("posterContainer");
let currentQuery = "";
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

searchInput.addEventListener("input", () => {
  indexBranoPrecedente = [];
  console.log(indexBranoPrecedente);
  const searchValue = searchInput.value;
  if (searchValue !== "") {
    currentQuery = searchValue;
    posterContainer.hidden = true;
    search();
  } else {
    posterContainer.hidden = false;
    containerMain.innerHTML = "";
  }
});
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

let search = () => {
  fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=" + currentQuery, {
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
    .then((search) => {
      console.log("data:", search);
      containerMain.innerHTML = "";

      // Creazione del div per l'album principale
      let divRow = document.createElement("div");
      divRow.className = "row";

      let divAlbumPrincipale = document.createElement("div");
      divAlbumPrincipale.className = "col-md-4";
      divAlbumPrincipale.innerHTML = `
      <h4 class="text-light mt-3"> Risultato più rilevante</h4>
          <div class="card mt-2">
                <img src="${search.data[0].album.cover_big}" class="card-img-top cursor-pointer" alt="Album cover">
              </div>
                <div class="card-body mt-3">
                  <h5 class="card-title text-light fs-2 text-center cursor-pointer">${search.data[0].album.title}</h5>
                  <h5 class="card-title text-light fs-4 mt-1 text-center cursor-pointer">${search.data[0].artist.name}</h5>
                </div>`;

      divRow.appendChild(divAlbumPrincipale);
      divAlbumPrincipale.addEventListener("click", () => {
        window.location.href = `album.html?albumId=${search.data[0].album.id}`;
      });

      const randomIndex = () => {
        return Math.floor(Math.random() * search.data.length);
      };

      btnCambiaBranoSuccessivo.addEventListener("click", () => {
        const indexCasuale = randomIndex();
        indexBranoPrecedente.push(indexCasuale);
        const branoCasuale = search.data[indexCasuale];
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
          const branoPrecedente = search.data[indiceBranoPrecedente];
          playAudio(branoPrecedente.preview);
          svgPlay.style.display = "inline";
          svgPausa.style.display = "none";
          imgAlbumFooter.src = branoPrecedente.album.cover;
          titoloAlbumFooter.innerText = branoPrecedente.title;
          artistaAlbumFooter.innerText = branoPrecedente.artist.name;
        } else {
          const indexCasuale = randomIndex();
          const branoCasuale = search.data[indexCasuale];
          playAudio(branoCasuale.preview);
          svgPlay.style.display = "inline";
          svgPausa.style.display = "none";
          imgAlbumFooter.src = branoCasuale.album.cover;
          titoloAlbumFooter.innerText = branoCasuale.title;
          artistaAlbumFooter.innerText = branoCasuale.artist.name;
        }
      });

      // Creazione dei div per i brani successivi
      let divBrani = document.createElement("div");
      divBrani.classList.add("col-md-8", "text-xs-center");
      let braniText = document.createElement("h4");
      braniText.innerText = "Brani";
      braniText.classList.add("text-light", "mt-3", "mb-3", "ms-2");
      divBrani.appendChild(braniText);

      search.data.slice(1, 6).forEach((brano) => {
        console.log("brano:", brano);
        let branoCard = document.createElement("div");
        const durataInSecondi = brano.duration;
        const minuti = Math.floor(durataInSecondi / 60);
        const secondi = durataInSecondi % 60;
        const durationFix = `${minuti}:${secondi < 10 ? "0" : ""}${secondi}`;

        branoCard.innerHTML = `
          <div class="card mb-3 bg-transparent text-light">
            <div class="row g-0">
              <div class="col-md-4 col-sm-4 col-xs-12">
                <img src="${brano.album.cover}" class="img-fluid rounded-start cursor-pointer" alt="Album cover">
              </div>
              <div class="col-md-4 col-sm-4 col-xs-12">
                <div class="card-body">
                  <h5 class="card-title cursor-pointer mt-4">${brano.title}</h5>
                  <h5 class="card-title cursor-pointer ">${brano.artist.name}</h5>
                </div>
              </div>
              <div class="col-md-4 col-sm-4 col-xs-12">
                <p class="text-white-50 text-md-end cursor-pointer mt-xs-3 mt-xl-5">${durationFix}</p>
              </div>
            </div>
          </div>`;

        branoCard.addEventListener("click", () => {
          playAudio(brano.preview);
          svgPlay.style.display = "inline";
          svgPausa.style.display = "none";
          imgAlbumFooter.src = brano.album.cover_medium;
          titoloAlbumFooter.innerText = brano.title;
          artistaAlbumFooter.innerText = brano.artist.name;
          durataBrano.innerText = formatTime(brano.duration);
        });

        divBrani.appendChild(branoCard);
      });

      divRow.appendChild(divBrani);
      containerMain.appendChild(divRow);
    })
    .catch((error) => {
      console.error("Errore:", error);
    });
};
