import { initialPlanetsDisplay } from '../src/services/initialPlanetsDisplay';
import * as getAllPlanetsModule from '../src/services/getAllPlanets';
import * as searchPlanetModule from '../src/services/searchPlanet';

describe('initialPlanetsDisplay', () => {
  const setResp = vi.fn();
  const setIsLoading = vi.fn();
  const setError = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls getAllPlanets if no lastRequest in localStorage', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
    const mockResponse = {
      total_records: 0,
      total_pages: 1,
      next: null,
      previous: null,
      result: [],
    };
    vi.spyOn(getAllPlanetsModule, 'getAllPlanets').mockResolvedValue(
      mockResponse
    );

    await initialPlanetsDisplay(setResp, setIsLoading, setError);

    expect(getAllPlanetsModule.getAllPlanets).toHaveBeenCalled();
    expect(setResp).toHaveBeenCalledWith(mockResponse);
    expect(setIsLoading).toHaveBeenCalledWith(false);
    expect(setError).not.toHaveBeenCalled();
  });

  it('calls searchPlanet if lastRequest exists in localStorage', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('Tatooine');
    const mockResponse = {
      total_records: 1,
      total_pages: 1,
      next: null,
      previous: null,
      result: [],
    };
    vi.spyOn(searchPlanetModule, 'searchPlanet').mockResolvedValue(
      mockResponse
    );

    await initialPlanetsDisplay(setResp, setIsLoading, setError);

    expect(searchPlanetModule.searchPlanet).toHaveBeenCalledWith('Tatooine');
    expect(setResp).toHaveBeenCalledWith(mockResponse);
    expect(setIsLoading).toHaveBeenCalledWith(false);
    expect(setError).not.toHaveBeenCalled();
  });

  it('sets error on failure', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
    vi.spyOn(getAllPlanetsModule, 'getAllPlanets').mockRejectedValue(
      new Error('Failed')
    );

    await initialPlanetsDisplay(setResp, setIsLoading, setError);

    expect(setResp).not.toHaveBeenCalled();
    expect(setIsLoading).toHaveBeenCalledWith(false);
    expect(setError).toHaveBeenCalledWith('Something wrong!');
  });
});
