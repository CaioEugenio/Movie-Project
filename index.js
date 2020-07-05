const fetchdata = async (searchTerm) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "dec18788",
      s: searchTerm,
    },
  });

  if (response.data.Error) {
    return [];
  }
  return response.data.Search;
};

const onInput = async (event) => {
  const movies = await fetchdata(event.target.value);
  for (let movie of movies) {
    const div = document.createElement("div");
    div.innerHTML = `
        <img src="${movie.Poster}"/>
        <h1>${movie.Title}</h1>
    `;

    document.querySelector("#target").appendChild(div);
  }
};

const root = document.querySelector(".autocomplete");
root.innerHTML = `
  <label><b>Search For a Movie</b></label>
  <input class="input"/>
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
`;

const input = document.querySelector("input");
const dropdown = document.querySelector(".dropdown");
const resultwrapper = document.querySelector(".results");

const onInput = async (event) => {
  const movies = await fetchdata(event.target.value);

  if (movies.length === 0) {
    dropdown.classList.remove("is-active");
    return;
  }

  resultwrapper.innerHTML = "";
  dropdown.classList.add("is-active");

  for (let movie of movies) {
    const option = document.createElement("a");
    const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;

    option.classList.add("dropdown-item");
    option.innerHTML = `
        <img src="${imgSrc}"/>
        ${movie.Title}
    `;

    option.addEventListener("click", () => {
      dropdown.classList.remove("is-active");
      input.value = movie.Title;
      onMovieSelect(movie);
    });

    resultwrapper.appendChild(option);
  }
};

input.addEventListener("input", debounce(onInput, 500));

document.addEventListener("click", (event) => {
  if (!root.contains(event.target)) {
    dropdown.classList.remove("is-active");
  }
});

const onMovieSelect = async (movie) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "dec18788",
      i: movie.imdbID,
    },
  });

  console.log(response.data);
};
