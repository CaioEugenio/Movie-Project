const fetchdata = async (searchTerm) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "dec18788",
      s: searchTerm,
    },
  });
  console.log(response.data);
};

const debounce = (func, delay = 1000) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

const onInput = (event) => {
  fetchdata(event.target.value);
};

const input = document.querySelector("input");
input.addEventListener("input", debounce(onInput, 500));
