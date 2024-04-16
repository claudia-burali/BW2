const URL = "https://deezerdevs-deezer.p.rapidapi.com/album/" + caso;

window.addEventListener("DOMContentLoaded", () => {
  fetch(URL, {
    method: "GET",
    body: JSON.stringify(),
    headers: {
      "Content-Type": "application/json",
      "X-RapidAPI-Key": "285e755c43mshee6ccde0f56b047p1fd3b7jsn69d102243084",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Error getting the images");
      }
    })
    .then((albums) => {
      console.log(albums);
      /*const row = document.getElementById("row");
      console.log(row);
      
      albums.forEach((album) => {
        const col = document.createElement("div");
        col.classList.add("col");
        col.innerHTML = `<div class="card border-black shadow-sm"> 
        <img src=${album.imageUrl} class="card-img-top" width="100%" alt="${album.name}">
        <div class="card-body"> 
        <p class="card-text">${album.name}</p> 
        <p class="card-text">€${album.description}</p> 
        <div class="d-flex justify-content-between align-items-center">
        <div class="btn-group">
        <a href="details.html?appId=${album._id}" class="btn btn-dark text-warning">Learn more</a>
        </div>
        </div>
        </div>
        </div>`;
        row.appendChild(col);
      });*/
    })
    .catch((err) => {
      console.log(err);
    });
});
