import { describe, it, expect, vi, beforeEach } from 'vitest';
import { searchPlanet } from '../src/services/searchPlanet';
import type { PlanetProps } from '../src/components/Planet';

describe('searchPlanet', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('get planet details', async () => {
    const mockPlanet: PlanetProps = {
      name: 'Tatooine',
      climate: 'arid',
      terrain: 'desert',
      population: '200000',
      diameter: '11370',
      gravity: '0.9 standard',
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        result: [{ properties: mockPlanet }],
      }),
    });

    const result = await searchPlanet('Tatooine');

    expect(result.result).toHaveLength(1);
    expect(result.result[0]).toEqual(mockPlanet);
  });

  it('thore error if request failed', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
    });

    await expect(searchPlanet('Alderaan')).rejects.toThrow(
      'Search request failed'
    );
  });

  it('check data structure', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        result: {},
      }),
    });
    await expect(searchPlanet('Dagobah')).rejects.toThrow(
      'Unexpected result structure'
    );
  });
});
