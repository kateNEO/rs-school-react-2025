'use client';
import { useEffect, useState } from 'react';

export type LocalStorageType = {
  theme: 'light' | 'dark';
  lastRequest: string;
};

export function useLocalStorage(): [
  LocalStorageType,
  (value: Partial<LocalStorageType>) => void,
] {
  const storeKey = 'storedObj';
  const initialValue: LocalStorageType = {
    theme: 'light',
    lastRequest: '',
  };
  const [storedObj, setStoredValue] = useState<LocalStorageType>(initialValue);
  useEffect(() => {
    try {
      const item = localStorage.getItem(storeKey);
      if (item) setStoredValue(JSON.parse(item));
    } catch (error) {
      console.error(error);
    }
  }, []);
  const setValue = (value: Partial<LocalStorageType>) => {
    try {
      // const currentV = getSavedData(storeKey);
      const newValue = { ...storedObj, ...value };
      setStoredValue(newValue);
      localStorage.setItem(storeKey, JSON.stringify(newValue));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedObj, setValue];
}
// export function getSavedData(key: string): LocalStorageType {
//
//   try {
//     const item = localStorage.getItem(key);
//     return item ? JSON.parse(item) : initialValue;
//   } catch (error) {
//     console.error(error);
//     return initialValue;
//   }
// }
