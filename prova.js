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
    cardDiv.innerHTML = `
          <div class="card bg-secondary p-0" style="max-width: 300px">
            <div class="row g-0">
              <div class="col-md-4">
                <img src=${playlistArray.album.cover} class="img-fluid rounded-start" alt="playlist cover" />
              </div>
              <div class="col-md-8">
                <div class="card-body text-white">
                  <h5 class="card-title">${playlistArray.title} </h5>
                </div>
              </div>
            </div>
            </div> `;
    document.getElementById("row").appendChild(cardDiv);
  });
};

const albumIds = [
  92956572, 94352652, 6899610, 620594, 299319, 13793191, 343880917, 387589567, 102128972, 10435266, 393197607,
  388425797, 1434890, 127402, 81797, 6364781, 130380032, 428115167, 74606742, 1318764, 8015598, 125584, 14879699,
  36963671, 1262269, 108444952, 10966644, 1262268, 9674822, 1347637, 51001312, 217658902, 14581088, 6575789, 97418,
  96844662, 78630952, 387946, 105611582, 6816700,
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
      albumCard.innerHTML = ` 
      <div class="card shadow-sm bg-dark">
      <img src=${album.cover_xl} alt="${album.title} class="img-fluid card-img-top px-3 py-3">
      <div class="card-body text-white"> 
      <h3 class="card-title">${album.title}</h3> 
      <p class="card-text">${album.artist.name}</p>
      </div>
      </div>`;
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
window.onload = () => {
  album();
};
