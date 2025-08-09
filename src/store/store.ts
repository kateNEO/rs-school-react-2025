import { create } from 'zustand/react';
type SelectedCardsStore = {
  selectedIdList: string[];
  toggleItem: (key: string) => void;
  isSelected: (key: string) => boolean;
  removeAll: () => void;
};
export const store = create<SelectedCardsStore>((set, get) => {
  return {
    selectedIdList: [],
    toggleItem: (key: string) => {
      const current = get().selectedIdList;
      const exists = current.includes(key);
      const updated = exists
        ? current.filter((id) => id !== key)
        : [...current, key];

      set({ selectedIdList: updated });
    },
    isSelected: (key: string) => {
      return get().selectedIdList.includes(key);
    },
    removeAll: () => set({ selectedIdList: [] }),
  };
});
