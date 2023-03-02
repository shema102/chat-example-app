import {useUserStore} from '../store/userStore';
import firestore from '@react-native-firebase/firestore';
import {useCallback} from 'react';

export const getUsernameForId = async (
  userId?: string | null,
): Promise<string> => {
  if (!userId) {
    return 'anonymous';
  }

  const userDoc = await firestore().doc(`users/${userId}`).get();
  return userDoc.data()?.username ?? 'anonymous';
};

const useUsername = () => {
  const user = useUserStore(state => state.user);

  const myId = user?.uid;

  const setUsername = useUserStore(state => state.setUsername);

  const saveUsername = useCallback(
    async (username: string) => {
      await firestore().doc(`users/${myId}`).set(
        {
          username: username,
        },
        {merge: true},
      );

      setUsername(username);
    },
    [myId, setUsername],
  );

  const getUsername = useCallback<
    (userId: string | undefined) => Promise<string>
  >(
    async (userId = myId) => {
      return getUsernameForId(userId);
    },
    [myId],
  );

  return {saveUsername, getUsername};
};

export default useUsername;
