export async function getAllPlanets() {
  const response = await fetch('https://swapi.dev/api/planets/');
  if (!response.ok) throw new Error('Wrong response status');
  return await response.json();
}
