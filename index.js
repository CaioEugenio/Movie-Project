const fetchdata = async (searchTerm) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "dec18788",
      s: searchTerm,
    },
  });
  console.log(response.data);
};

let timeoutId;
const onInput = (event) => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(() => {
    fetchdata(event.target.value);
  }, 1000);
};

const input = document.querySelector("input");
input.addEventListener("input", onInput);
