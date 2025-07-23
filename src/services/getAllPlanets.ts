import type { PlanetList, Response } from '../App.tsx';

interface ApiResponse {
  total_records: number;
  total_pages: number;
  next: string | null;
  previous: string | null;
  results: PlanetList[];
}
export async function getAllPlanets(): Promise<Response> {
  const res = await fetch('https://www.swapi.tech/api/planets');
  const data: ApiResponse = await res.json();
  console.log(data);
  return {
    total_records: data.total_records,
    total_pages: data.total_pages,
    next: data.next,
    previous: data.previous,
    result: data.results,
  };
  // const detailedPlanets = await Promise.all(
  //   data.results.map((planet: { url: string }) =>
  //     fetchPlanetDetails(planet.url),
  //   ),
  // );

  // return {
  //   total_records: data.total_records,
  //   total_pages: data.total_pages,
  //   next: data.next,
  //   previous: data.previous,
  //   result: detailedPlanets,
  // };
}
// async function fetchPlanetDetails(url: string): Promise<PlanetProps> {
//   const res = await fetch(url);
//   const data = await res.json();
//   return data.result.properties;
// }
