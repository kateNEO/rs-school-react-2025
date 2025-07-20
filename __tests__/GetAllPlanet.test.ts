import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getAllPlanets } from '../src/services/getAllPlanets';
import type { PlanetProps } from '../src/components/Planet.tsx';

describe('getAllPlanets', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('returns full planet list with detailed data', async () => {
    const mockSummaryResponse = {
      total_records: 2,
      total_pages: 1,
      next: null,
      previous: null,
      results: [
        { url: 'https://swapi.tech/api/planets/1' },
        { url: 'https://swapi.tech/api/planets/2' },
      ],
    };

    const mockDetailResponse1 = {
      result: {
        properties: { name: 'Tatooine', climate: 'arid' } as PlanetProps,
      },
    };

    const mockDetailResponse2 = {
      result: {
        properties: { name: 'Alderaan', climate: 'temperate' } as PlanetProps,
      },
    };

    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        json: async () => mockSummaryResponse,
      })
      .mockResolvedValueOnce({
        json: async () => mockDetailResponse1,
      })
      .mockResolvedValueOnce({
        json: async () => mockDetailResponse2,
      });

    global.fetch = fetchMock as unknown as typeof fetch;

    const result = await getAllPlanets();

    expect(result.total_records).toBe(2);
    expect(result.result).toHaveLength(2);
    expect(result.result[0].name).toBe('Tatooine');
    expect(result.result[1].climate).toBe('temperate');
  });
});
