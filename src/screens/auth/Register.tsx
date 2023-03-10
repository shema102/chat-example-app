import React, {FC, useCallback} from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';
import LoginRegisterForm from '../../components/LoginForm';
import {Text} from 'react-native-paper';
import useRegister from '../../hooks/Auth/useRegister';
import {NavigationKeys} from '../../navigation/NavigationKeys';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackParamList} from '../../navigation/AuthNavigator';

type Props = StackScreenProps<AuthStackParamList>;

const Register: FC<Props> = ({navigation}) => {
  const {register, loading, error} = useRegister();

  const onSubmit = (email: string, password: string) => {
    register(email, password);
    Keyboard.dismiss();
  };

  const onLoginButtonPress = useCallback(() => {
    navigation.navigate(NavigationKeys.LogIn);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <LoginRegisterForm
        type={'register'}
        onSubmit={onSubmit}
        style={styles.form}
        loading={loading}
      />
      {error && <Text>{error}</Text>}

      <Text style={styles.loginButton} onPress={onLoginButtonPress}>
        Login
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
  loginButton: {
    marginTop: 20,
  },
});

export default Register;
