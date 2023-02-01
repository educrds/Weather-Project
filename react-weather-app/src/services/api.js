const fetchData = async (endpoint, weather) => {
  try {
    const { data } = await weather(endpoint);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchData;
