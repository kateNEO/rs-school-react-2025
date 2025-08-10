import { useState } from 'react';

export type LocalStorageType = {
  theme: 'light' | 'dark';
  lastRequest: string;
};

export function useLocalStorage(): [
  LocalStorageType,
  (value: Partial<LocalStorageType>) => void,
] {
  const storeKey = 'storedObj';

  const [storedObj, setStoredValue] = useState<LocalStorageType>(() => {
    return getSavedData(storeKey);
  });

  const setValue = (value: Partial<LocalStorageType>) => {
    try {
      const currentV = getSavedData(storeKey);
      const newValue = { ...currentV, ...value };
      setStoredValue(newValue);
      localStorage.setItem(storeKey, JSON.stringify(newValue));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedObj, setValue];
}
export function getSavedData(key: string): LocalStorageType {
  const initialValue: LocalStorageType = {
    theme: 'light',
    lastRequest: '',
  };
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    console.error(error);
    return initialValue;
  }
}
