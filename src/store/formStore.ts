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
  picture: string;
};
type FormStore = {
  savedData: FormData;
  setData: (data: FormData) => void;
  getData: () => FormData;
};
export const formStore = createStore<FormStore>((set, get) => ({
  savedData: {
    name: '',
    age: 0,
    email: '',
    password: {
      password: '',
      confirmPassword: '',
    },
    gender: 'male',
    picture: '',
  },
  setData: (data) => {
    set({ savedData: data });
    console.log(get().savedData);
  },
  getData: () => get().savedData,
}));
