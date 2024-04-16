let artistContainer = document.getElementById("artist");
const artistIds = [
  1182, 214810, 1026, 406, 4138, 5286, 12247, 5608864, 4868678, 176639, 534258, 532, 458, 117, 599, 1197801, 331727,
  1092125, 647650, 464, 98, 407, 399, 3702, 860, 1994, 652,
];
const URL_ARTIST_BASE = "https://deezerdevs-deezer.p.rapidapi.com/artist/";

const fetchArtist = (artistId) => {
  const URL_ARTIS = URL_ARTIST_BASE + artistId;

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
  <img src=${album.cover} alt="${album.title}">
  <div> 
  <h3>${album.title}</h3> 
  <p>${album.artist.name}</p>
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
