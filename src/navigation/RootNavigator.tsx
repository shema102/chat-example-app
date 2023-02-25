import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

const RootNavigator: FC = () => {
  const isLogged = false;

  return (
    <NavigationContainer>
      {isLogged ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
