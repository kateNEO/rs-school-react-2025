import { getAllPlanets } from './getAllPlanets.ts';
import { searchPlanet } from './searchPlanet.ts';
import type { Response } from '../App.tsx';

export async function initialPlanetsDisplay(
  setResp: (response: Response) => void,
  setIsLoading: (value: boolean) => void,
  setError: (error: string) => void
) {
  const data = localStorage.getItem('lastRequest');
  const lastRequest = data?.trim();
  try {
    let resp: Response;
    if (!lastRequest) {
      resp = await getAllPlanets();
    } else {
      resp = await searchPlanet(lastRequest);
    }
    if (resp) {
      setResp(resp);
      setIsLoading(false);
    }
  } catch (error) {
    console.error('Error:', error);
    setIsLoading(false);
    setError('Something wrong!');
  }
}
