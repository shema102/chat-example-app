import React, {FC} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationKeys} from './NavigationKeys';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';

export type AuthStackParamList = {
  [NavigationKeys.Login]: undefined;
  [NavigationKeys.Register]: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigator: FC = () => {
  return (
    <Stack.Navigator initialRouteName={NavigationKeys.Login}>
      <Stack.Screen name={NavigationKeys.Login} component={Login} />
      <Stack.Screen name={NavigationKeys.Register} component={Register} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
