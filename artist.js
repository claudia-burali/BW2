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
    })
    .catch((error) => {
      console.error(error);
    });
};

const createTrackList = function (track, index) {
  let trackDiv = document.createElement("div");
  trackDiv.classList.add("track", "row");
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

  return trackDiv;
};

window.addEventListener("DOMContentLoaded", () => {
  let params = new URLSearchParams(document.location.search);
  let artistId = params.get("artistId");
  console.log(artistId);
  getArtist(artistId);
  getTracks(artistId);
});
