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
let currentAudio = null;

let playAudio = (audioUrl) => {
  if (currentAudio) {
    currentAudio.pause();
  }
  currentAudio = new Audio(audioUrl);

  let volumeBrano = document.getElementById("volume").value;
  currentAudio.volume = volumeBrano;
  currentAudio.play();
};

volumeBrano.addEventListener("input", () => {
  if (currentAudio) {
    currentAudio.volume = volumeBrano.value;
  }
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
      divBrani.className = "col-md-8";
      let braniText = document.createElement("h4");
      braniText.innerText = "Brani";
      braniText.classList.add("text-light", "mt-3", "mb-3");
      divBrani.appendChild(braniText);

      search.data.slice(1, 6).forEach((brano) => {
        console.log("brano:", brano);
        let branoCard = document.createElement("div");
        const secondi = brano.duration;
        const minuti = secondi / 60;
        const minutiFormattati = minuti.toFixed(2);
        console.log(minutiFormattati);

        branoCard.innerHTML = `
          <div class="card mb-3 bg-transparent text-light">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${brano.album.cover}" class="img-fluid rounded-start cursor-pointer" alt="Album cover">
              </div>
              <div class="col-md-4">
                <div class="card-body">
                  <h5 class="card-title cursor-pointer mt-4">${brano.title}</h5>
                  <h5 class="card-title cursor-pointer ">${brano.artist.name}</h5>
                </div>
              </div>
              <div class="col-md-4">
                <p class="text-white-50 text-end cursor-pointer me-5 mt-5">${minutiFormattati}</p>
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
