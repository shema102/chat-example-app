import React, {FC, useCallback, useState} from 'react';
import Dialog from 'react-native-dialog';
import {useUserStore} from '../store/userStore';
import {validateUsername} from '../utils/validation';
import {StyleSheet} from 'react-native';

type Props = {
  onDismiss: () => void;
  onConfirm: (name: string) => void;
};

const SetUsernameDialog: FC<Props> = ({onConfirm, onDismiss}) => {
  const [username, setUsername] = useState('');

  const [usernameError, setUsernameError] = useState<string | null>(null);

  const currentUsername = useUserStore(state => state.username);

  const usernameToShow = currentUsername ?? 'Username not set';

  const handleConfirm = useCallback(async () => {
    const {valid, errors} = await validateUsername(username);

    if (!valid) {
      setUsernameError(errors[0]);
      return;
    }

    onConfirm(username);
    onDismiss();
  }, [username, onConfirm, onDismiss]);

  return (
    <Dialog.Container visible onBackdropPress={onDismiss}>
      <Dialog.Title>Create chanel</Dialog.Title>
      <Dialog.Description>{`Enter new name below.\n(Current username: ${usernameToShow})`}</Dialog.Description>
      <Dialog.Input value={username} onChangeText={setUsername} autoFocus />
      {usernameError && (
        <Dialog.Description style={styles.error}>
          {usernameError}
        </Dialog.Description>
      )}
      <Dialog.Button label="Cancel" onPress={onDismiss} />
      <Dialog.Button label="Confirm" onPress={handleConfirm} />
    </Dialog.Container>
  );
};

const styles = StyleSheet.create({
  error: {
    color: 'red',
  },
});

export default SetUsernameDialog;
