import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../src/hooks/useLocalStorage';

describe('useLocalStorage', () => {
  const key = 'storedObj';
  beforeEach(() => {
    localStorage.clear();
  });
  const defaultValue = {
    theme: 'light',
    lastRequest: '',
  };
  it('should return the default value if localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage());
    expect(result.current[0]).toEqual(defaultValue);
  });

  it('should read the value from localStorage if it exists', () => {
    const stored = { theme: 'dark', lastRequest: 'witcher' };
    localStorage.setItem(key, JSON.stringify(stored));
    const { result } = renderHook(() => useLocalStorage());
    expect(result.current[0]).toEqual(stored);
  });

  it('should update the value and localStorage when setValue is called', () => {
    const { result } = renderHook(() => useLocalStorage());

    act(() => {
      result.current[1]({ theme: 'dark' });
    });

    expect(result.current[0]).toEqual({
      theme: 'dark',
      lastRequest: '',
    });
    const item = localStorage.getItem(key);
    expect(item).not.toBeNull();

    if (item) {
      expect(JSON.parse(item)).toEqual({
        theme: 'dark',
        lastRequest: '',
      });
    }
  });
});
