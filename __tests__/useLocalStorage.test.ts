import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../src/hooks/useLocalStorage';

describe('useLocalStorage', () => {
  const key = 'testKey';
  beforeEach(() => {
    localStorage.clear();
  });
  it('should return the default value if localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage(key, 'defaultValue'));
    expect(result.current[0]).toBe('defaultValue');
  });

  it('should read the value from localStorage if it exists', () => {
    localStorage.setItem(key, 'storedValue');
    const { result } = renderHook(() => useLocalStorage(key, 'defaultValue'));
    expect(result.current[0]).toBe('storedValue');
  });

  it('should update the value and localStorage when setValue is called', () => {
    const { result } = renderHook(() => useLocalStorage(key, 'initial'));

    act(() => {
      result.current[1]('newValue');
    });

    expect(result.current[0]).toBe('newValue');
    expect(localStorage.getItem(key)).toBe('newValue');
  });
});
