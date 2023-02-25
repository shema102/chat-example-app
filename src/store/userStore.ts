import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

export type UserState = {
  userName: string | null;
  user: FirebaseAuthTypes.User | null;

  setUserName: (name: string) => void;
  setUser: (user: FirebaseAuthTypes.User | null) => void;
};

export const useUserStore = create<UserState>()(
  persist(
    set => ({
      userName: null,
      user: null,
      setUserName: name => set(() => ({userName: name})),
      setUser: user => set(() => ({user: user})),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => !['user'].includes(key)),
        ),
    },
  ),
);
