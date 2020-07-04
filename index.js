const fetchdata = async () => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "dec18788",
      i: "tt0848228",
    },
  });
  console.log(response.data);
};

fetchdata();
