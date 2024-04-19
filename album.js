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
      let artistImg = document.getElementById("picture");
      artistImg.innerHTML = `
      <img style="width:40px" class="rounded-circle picture" src="${album.artist.picture_small}" alt="artist picture"/>`;
      let name = document.querySelector(".name");
      name.innerText = album.artist.name;
      let date = document.querySelector(".date");
      date.innerText = "_" + album.release_date + "_";
      let tracks = document.querySelector(".track");
      tracks.innerText = album.nb_tracks + " brani,";
      let duration = document.querySelector(".time");
      const durata = album.duration;
      const min = Math.floor(durata / 60);
      const sec = durata % 60;
      const durataFix = `${min} min ${sec < 10 ? "0" : ""}${sec} sec.`;
      duration.innerText = durataFix;
    })
    .catch((error) => {
      console.error(error);
    });
};

const getTracks = function (albumId) {
  let url = "https://striveschool-api.herokuapp.com/api/deezer/album/" + albumId;
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

document.getElementById("homeIcon").addEventListener("click", function () {
  window.location.href = "index.html";
});
