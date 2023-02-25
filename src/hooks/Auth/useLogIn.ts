import {useCallback, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {parseFirebaseAuthError} from '../../utils/auth';

const useLogIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const logIn = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      console.log(e);

      setError(parseFirebaseAuthError(e));
    } finally {
      setLoading(false);
    }
  }, []);

  return {logIn, loading, error};
};

export default useLogIn;
