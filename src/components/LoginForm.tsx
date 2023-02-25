import React, {FC, useCallback, useMemo} from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {validateAuth} from '../utils/validation';
import {not} from '../utils/utils';

export type FormType = 'login' | 'register';

type Props = {
  onSubmit: (email: string, password: string) => void;
  type: FormType;
  loading?: boolean;
} & ViewProps;

const LoginForm: FC<Props> = ({onSubmit, type, loading = false, ...props}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [passwordHidden, setPasswordHidden] = React.useState(true);

  const [formErrors, setFormErrors] = React.useState<Array<string>>([]);

  const onSubmitPressed = useCallback(async () => {
    setFormErrors([]);

    const validationResult = await validateAuth({email, password});

    if (!validationResult.valid) {
      setFormErrors(validationResult.errors);
      return;
    }

    onSubmit(email, password);
  }, [email, onSubmit, password]);

  const Errors = useMemo(() => {
    return formErrors.map((error, index) => <Text key={index}>{error}</Text>);
  }, [formErrors]);

  const buttonText = type === 'login' ? 'Login' : 'Register';

  return (
    <View {...props}>
      <TextInput
        label={'Email'}
        mode={'outlined'}
        value={email}
        onChangeText={setEmail}
      />
      <View style={styles.shim} />

      <TextInput
        label={'Password'}
        mode={'outlined'}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={passwordHidden}
        right={
          <TextInput.Icon icon="eye" onPress={() => setPasswordHidden(not)} />
        }
      />
      <View style={styles.shim} />

      {formErrors.length > 0 ? (
        <>
          {Errors}
          <View style={styles.shim} />
        </>
      ) : null}

      <Button
        mode={'contained'}
        onPress={onSubmitPressed}
        loading={loading}
        disabled={loading}>
        {buttonText}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  shim: {
    height: 10,
  },
});

export default LoginForm;
