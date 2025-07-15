import type { PlanetProps } from '../components/Planet.tsx';
import type { Response } from '../App.tsx';

export async function searchPlanet(name: string): Promise<Response> {
  const res = await fetch(
    `https://www.swapi.tech/api/planets/?name=${encodeURIComponent(name)}`
  );
  if (!res.ok) throw new Error('Search request failed');
  const data = await res.json();
  if (!Array.isArray(data.result)) {
    throw new Error('Unexpected result structure');
  }
  const result: PlanetProps[] = data.result.map(
    (item: { properties: PlanetProps }) => item.properties
  );
  return {
    total_records: result.length,
    total_pages: 1,
    next: null,
    previous: null,
    result,
  };
}
