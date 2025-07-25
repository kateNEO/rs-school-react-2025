import { initialBooksDisplay } from '../src/services/initialPlanetsDisplay';
import * as getAllPlanetsModule from '../src/services/getBooks';
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
    vi.spyOn(getAllPlanetsModule, 'getBooks').mockResolvedValue(mockResponse);

    await initialBooksDisplay(setResp, setIsLoading, setError);

    expect(getAllPlanetsModule.getBooks).toHaveBeenCalled();
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

    await initialBooksDisplay(setResp, setIsLoading, setError);

    expect(searchPlanetModule.searchPlanet).toHaveBeenCalledWith('Tatooine');
    expect(setResp).toHaveBeenCalledWith(mockResponse);
    expect(setIsLoading).toHaveBeenCalledWith(false);
    expect(setError).not.toHaveBeenCalled();
  });

  it('sets error on failure', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
    vi.spyOn(getAllPlanetsModule, 'getBooks').mockRejectedValue(
      new Error('Failed')
    );

    await initialBooksDisplay(setResp, setIsLoading, setError);

    expect(setResp).not.toHaveBeenCalled();
    expect(setIsLoading).toHaveBeenCalledWith(false);
    expect(setError).toHaveBeenCalledWith('Something wrong!');
  });
});
