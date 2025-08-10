import { create } from 'zustand/react';

import type { BooksCard } from '../pages/MainPage.tsx';
export type SelectedCardsStore = {
  selectedIdList: BooksCard[];
  toggleItem: (book: BooksCard) => void;
  isSelected: (key: string) => boolean;
  removeAll: () => void;
};
export const store = create<SelectedCardsStore>((set, get) => {
  return {
    selectedIdList: [],
    toggleItem: (book: BooksCard) => {
      const current = get().selectedIdList;
      const exists = current.some((b) => b.key === book.key);
      const updated = exists
        ? current.filter((bookItem) => bookItem.key !== book.key)
        : [...current, book];

      set({ selectedIdList: updated });
    },
    isSelected: (key: string) => {
      return get().selectedIdList.some((b) => b.key === key);
    },
    removeAll: () => set({ selectedIdList: [] }),
  };
});
