import {useCallback, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {parseFirebaseAuthError} from '../../utils/auth';

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (e) {
      console.log(e);
      setError(parseFirebaseAuthError(e));
    } finally {
      setLoading(false);
    }
  }, []);

  return {register, loading, error};
};

export default useRegister;
