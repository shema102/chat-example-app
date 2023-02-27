import React, {FC, useCallback, useState} from 'react';
import Dialog from 'react-native-dialog';

type Props = {
  onDismiss: () => void;
  onConfirm: (name: string) => void;
};

const NewChatChannelDialog: FC<Props> = ({onConfirm, onDismiss}) => {
  const [name, setName] = useState('');

  const handleConfirm = useCallback(() => {
    onConfirm(name);
    onDismiss();
  }, [name, onConfirm, onDismiss]);

  return (
    <Dialog.Container visible onBackdropPress={onDismiss}>
      <Dialog.Title>Create chanel</Dialog.Title>
      <Dialog.Description>Enter channel name</Dialog.Description>
      <Dialog.Input value={name} onChangeText={setName} autoFocus />
      <Dialog.Button label="Cancel" onPress={onDismiss} />
      <Dialog.Button label="Confirm" onPress={handleConfirm} />
    </Dialog.Container>
  );
};

export default NewChatChannelDialog;
