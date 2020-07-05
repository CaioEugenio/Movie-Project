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
  <input class=input/>
  <div class="dropdown is-active">
    <div class="dropdown-menu">
      <div class="dropdown-menu results"></div>
    </div>
  </div>
`;

const input = document.querySelector("input");
const dropdown = document.querySelector(".dropdown");
const resultwrapper = document.querySelector(".results");

input.addEventListener("input", debounce(onInput, 500));
