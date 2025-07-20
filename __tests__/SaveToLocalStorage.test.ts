import { describe, it, expect, vi } from 'vitest';
import { saveToLocalStorage } from '../src/services/saveToLocalStorage';

describe('saveToLocalStorage', () => {
  it('should save value to localStorage with key "lastRequest"', () => {
    const mockSetItem = vi.spyOn(Storage.prototype, 'setItem');
    const input = 'Tatooine';

    saveToLocalStorage(input);

    expect(mockSetItem).toHaveBeenCalledWith('lastRequest', input);

    mockSetItem.mockRestore();
  });
});
