import { createStore } from 'zustand/vanilla';

export type FormData = {
  name: string;
  age: number;
  email: string;
  password: {
    password: string;
    confirmPassword: string;
  };
  gender: 'male' | 'female';
  country: string;
  picture: string;
};
type FormStore = {
  savedData: FormData[];
  setData: (data: FormData) => void;
  getData: () => FormData[];
};
export const formStore = createStore<FormStore>((set, get) => ({
  savedData: [],
  setData: (data) => {
    set((state) => ({
      savedData: [...state.savedData, data],
    }));
    console.log(get().savedData);
  },
  getData: () => get().savedData,
}));
