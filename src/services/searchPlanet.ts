import type { PlanetProps } from '../components/Planet.tsx';
import type { PlanetList, Response } from '../components/MainPage.tsx';

export async function searchPlanet(name: string): Promise<Response> {
  const res = await fetch(
    `https://www.swapi.tech/api/planets/?name=${encodeURIComponent(name)}`
  );
  if (!res.ok) throw new Error('Search request failed');
  const data = await res.json();
  console.log(data);
  if (!Array.isArray(data.result)) {
    throw new Error('Unexpected result structure');
  }
  const result: PlanetList[] = data.result.map(
    (item: { properties: PlanetProps }) => {
      const { name, url } = item.properties;
      return { name, url };
    }
  );
  return {
    total_records: data.result.length,
    total_pages: 1,
    next: null,
    previous: null,
    result,
  };
}
