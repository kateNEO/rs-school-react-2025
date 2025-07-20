import type { PlanetProps } from '../components/Planet.tsx';
import type { Response } from '../App.tsx';

export async function getAllPlanets(): Promise<Response> {
  const res = await fetch('https://www.swapi.tech/api/planets');
  const data = await res.json();

  const detailedPlanets = await Promise.all(
    data.results.map((planet: { url: string }) =>
      fetchPlanetDetails(planet.url)
    )
  );

  return {
    total_records: data.total_records,
    total_pages: data.total_pages,
    next: data.next,
    previous: data.previous,
    result: detailedPlanets,
  };
}
async function fetchPlanetDetails(url: string): Promise<PlanetProps> {
  const res = await fetch(url);
  const data = await res.json();
  return data.result.properties;
}
