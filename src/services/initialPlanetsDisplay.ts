import { getAllPlanets } from './getAllPlanets.ts';
import type { PlanetProps } from '../components/Planet.tsx';
import { searchPlanet } from './searchPlanet.ts';

export async function initialPlanetsDisplay(
  onSearch: (planet: PlanetProps[]) => void,
  setIsLoading: (value: boolean) => void
) {
  const data = localStorage.getItem('lastRequest');
  const lastRequest = data?.trim();
  try {
    let resp;
    if (!lastRequest) {
      resp = await getAllPlanets();
    } else {
      resp = await searchPlanet(lastRequest);
    }
    if (resp && 'results' in resp) {
      onSearch(resp.results);
      setIsLoading(false);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
