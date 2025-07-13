export async function searchPlanet(planet: string) {
  console.log(planet);
  const response = await fetch(
    `https://swapi.dev/api/planets//?search=${planet}`
  );
  if (!response.ok) throw new Error('Error with load');
  return await response.json();
}
