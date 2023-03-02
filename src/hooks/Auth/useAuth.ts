import {useCallback, useEffect, useState} from 'react';
import {useUserStore} from '../../store/userStore';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import useUsername from '../useUsername';

const useAuth = () => {
  const [initializing, setInitializing] = useState(true);

  const setUser = useUserStore(state => state.setUser);

  const {getUsername} = useUsername();

  const setUsername = useUserStore(state => state.setUsername);

  const onAuthStateChanged = useCallback(
    (user: FirebaseAuthTypes.User | null) => {
      setUser(user);

      if (user) {
        getUsername(user.uid).then(name => {
          setUsername(name);
        });
      }

      if (initializing) {
        setInitializing(false);
      }
    },
    [getUsername, initializing, setUser, setUsername],
  );

  useEffect(() => {
    return auth().onAuthStateChanged(onAuthStateChanged); // unsubscribe on unmount
  }, [onAuthStateChanged]);

  return {initializing};
};

export default useAuth;
