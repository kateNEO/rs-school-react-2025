export async function getAllPlanets() {
  const response = await fetch('https://swapi.dev/api/planets/');
  if (!response.ok) throw new Error('Ошибка загрузки');
  return await response.json();
}
