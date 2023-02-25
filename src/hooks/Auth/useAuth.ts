import {useCallback, useEffect, useState} from 'react';
import {useUserStore} from '../../store/userStore';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

const useAuth = () => {
  const [initializing, setInitializing] = useState(true);

  const setUser = useUserStore(state => state.setUser);

  const onAuthStateChanged = useCallback(
    (user: FirebaseAuthTypes.User | null) => {
      setUser(user);
      if (initializing) {
        setInitializing(false);
      }
    },
    [initializing, setUser],
  );

  useEffect(() => {
    return auth().onAuthStateChanged(onAuthStateChanged); // unsubscribe on unmount
  }, [onAuthStateChanged]);

  return {initializing};
};

export default useAuth;
