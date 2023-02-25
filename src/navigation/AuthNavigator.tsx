import React, {FC} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationKeys} from './NavigationKeys';
import LogIn from '../screens/auth/LogIn';
import Register from '../screens/auth/Register';

export type AuthStackParamList = {
  [NavigationKeys.LogIn]: undefined;
  [NavigationKeys.Register]: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigator: FC = () => {
  return (
    <Stack.Navigator initialRouteName={NavigationKeys.LogIn}>
      <Stack.Screen name={NavigationKeys.LogIn} component={LogIn} />
      <Stack.Screen name={NavigationKeys.Register} component={Register} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
