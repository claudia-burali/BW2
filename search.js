let containerMain = document.getElementById("containerMain");
let searchInput = document.getElementById("searchInput");
let posterContainer = document.getElementById("posterContainer");
let currentQuery = "";
let volumeBrano = document.getElementById("volume");

///CONTROLLI AUDIO
searchInput.addEventListener("input", () => {
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
      divRow.style.cursor = "pointer";

      let divAlbumPrincipale = document.createElement("div");
      divAlbumPrincipale.className = "col-md-4";
      divAlbumPrincipale.innerHTML = `
      <h4 class="text-light text-center mt-3"> Risultato più rilevante</h4>
          <div class="card mt-2">
                <img src="${search.data[0].album.cover_big}" class="card-img-top" alt="Album cover">
              </div>
                <div class="card-body mt-3">
                  <h5 class="card-title text-light fs-2 text-center">${search.data[0].album.title}</h5>
                  <h5 class="card-title text-light fs-4 mt-1 text-center">${search.data[0].artist.name}</h5>
                </div>`;

      divRow.appendChild(divAlbumPrincipale);

      // Creazione dei div per i brani successivi
      let divBrani = document.createElement("div");
      divBrani.className = "col-md-8";
      let braniText = document.createElement("h4");
      braniText.innerText = "Brani";
      braniText.classList.add("text-light", "text-center", "mt-3", "mb-3");
      divBrani.appendChild(braniText);
      search.data.slice(1, 6).forEach((brano) => {
        let branoCard = document.createElement("div");
        branoCard.style.cursor = "pointer";
        branoCard.innerHTML = `
          <div class="card mb-3 bg-transparent text-light">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${brano.album.cover}" class="img-fluid rounded-start" alt="Album cover">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${brano.album.title}</h5>
                  <h5 class="card-title">${brano.artist.name}</h5>
                </div>
              </div>
            </div>
          </div>`;

        branoCard.addEventListener("click", () => {
          playAudio(brano.preview);
          let imgAlbumFooter = document.getElementById("imgAlbumFooter");
          imgAlbumFooter.src = brano.album.cover;
          let titoloAlbumFooter = document.getElementById("titoloAlbumFooter");
          titoloAlbumFooter.innerText = brano.album.title;
          let artistaAlbumFooter =
            document.getElementById("artistaAlbumFooter");
          artistaAlbumFooter.innerText = brano.album.name;
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
