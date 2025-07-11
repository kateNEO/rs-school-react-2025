export async function searchPlanet(planet: string) {
  const response = await fetch(
    `https://swapi.dev/api/planets//?search=${planet}`
  );
  if (!response.ok) throw new Error('Ошибка загрузки');
  return await response.json();
}
