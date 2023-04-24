// Fetch API Key : http://www.omdbapi.com/?apikey=a33698e8&s=

const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", async function () {
  const inputKeyword = document.querySelector(".input-keyword");
  const movies = await getMovies(inputKeyword.value);
  console.log(movies);
  updateUI(movies);
});

function getMovies(keyword) {
  return fetch(`http://www.omdbapi.com/?apikey=a33698e8&s=${keyword}`)
    .then((response) => response.json())
    .then((response) => response.Search);
}

function updateUI(movie) {
  let cards = ``;
  movie.forEach((m) => (cards += showCard(m)));
  const moviesContainer = document.querySelector(".movies-container");
  moviesContainer.innerHTML = cards;
}

// event binding

document.addEventListener("click", async (e) => {
  console.log(e.target.classList);
  if (e.target.classList.contains("modal-detail-button")) {
    const imdbid = e.target.dataset.imdbid;
    const movieDetail = await getMovieDetail(imdbid);
    updateCardUI(movieDetail);
  }
});

function getMovieDetail(imdbid) {
  return fetch(`http://www.omdbapi.com/?apikey=a33698e8&i=${imdbid}`)
    .then((response) => response.json())
    .then((m) => m);
}

function updateCardUI(m) {
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = showDetails(m);
}

function showCard(movie) {
  return `<div class="col-md-4 my-5">
      <div class="card">
          <img src="${movie.Poster}" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">${movie.Title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${movie.Year}</h6>
            <button type="button" class="btn btn-primary modal-detail-button" data-imdbid="${movie.imdbID}" data-toggle="modal" data-target="#movies-details-modal">Show Details</button>
          </div>
        </div>
  </div>`;
}

function showDetails(m) {
  return `<div class="container-fluid">
    <div class="row">
        <div class="col-md-3">
            <img src="${m.Poster}" class="img-fluid">
        </div>
        <div class="col-md">
            <ul class="list-group">
                <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                <li class="list-group-item"> <strong>Director : </strong> ${m.Director} </li>
                <li class="list-group-item"><strong>Actors : </strong> ${m.Actors} </li>
                <li class="list-group-item"><strong>Writer : </strong> ${m.Writer}</li>
                <li class="list-group-item"><strong>Plot : </strong><br>${m.Plot}</li>
            </ul>
        </div>
    </div>
  </div>`;
}
