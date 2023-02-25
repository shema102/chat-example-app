import React, {FC, useCallback} from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';
import LoginForm from '../../components/LoginForm';
import useLogIn from '../../hooks/Auth/useLogIn';
import {Text} from 'react-native-paper';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackParamList} from '../../navigation/AuthNavigator';
import {NavigationKeys} from '../../navigation/NavigationKeys';

type Props = StackScreenProps<AuthStackParamList>;

const LogIn: FC<Props> = ({navigation}) => {
  const {logIn, loading, error} = useLogIn();

  const onSubmit = (email: string, password: string) => {
    logIn(email, password);
    Keyboard.dismiss();
  };

  const onRegisterButtonPress = useCallback(() => {
    navigation.navigate(NavigationKeys.Register);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <LoginForm
        type={'login'}
        onSubmit={onSubmit}
        style={styles.form}
        loading={loading}
      />
      {error && <Text>{error}</Text>}

      <Text style={styles.registerButton} onPress={onRegisterButtonPress}>
        Register
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  form: {
    alignSelf: 'stretch',
  },
  registerButton: {
    marginTop: 20,
  },
});

export default LogIn;
