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
  388425797, 1434890, 127402, 10966644, 137272602, 309377597, 6816700, 469682765, 560398332,
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
  399, 58447102, 4050205,
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
      artistCard.innerHTML = ` 
      <div class="card shadow-sm bg-dark">
      <img src=${artist.picture_xl} alt="${artist.name} class="img-fluid card-img-top px-3 py-3">
      <div class="card-body text-white"> 
      <h3 class="card-title py-2">${artist.name}</h3> 
      </div>
      </div>`;
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
  album();
  artist();
};
