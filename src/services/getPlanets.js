const getPlanets = async () => {
  const response = await fetch('https://swapi.dev/api/planets');
  const { results } = await response.json();
  results.map((item) => delete (item.residents));
  const keys = Object.keys(results[0]);
  return {
    results,
    keys,
  };
};

export default getPlanets;
