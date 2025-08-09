import { create } from 'zustand/react';
type SelectedCardsStore = {
  selectedIdList: string[];
  toggleItem: (key: string) => void;
  isSelected: (key: string) => boolean;
};
export const store = create<SelectedCardsStore>((set, get) => {
  return {
    selectedIdList: [],
    toggleItem: (key: string) => {
      console.log(key);
      const current = get().selectedIdList;
      const exists = current.includes(key);
      const updated = exists
        ? current.filter((id) => id !== key)
        : [...current, key];

      set({ selectedIdList: updated });
      console.log(store.getState().selectedIdList);
    },
    isSelected: (key: string) => get().selectedIdList.includes(key),
  };
});
