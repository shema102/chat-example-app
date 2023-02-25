import React, {FC} from 'react';
import RootNavigator from './navigation/RootNavigator';
import {NavigationContainer} from '@react-navigation/native';
import useAuth from './hooks/Auth/useAuth';
import Initializing from './screens/Initializing';

const App: FC = () => {
  const {initializing} = useAuth();

  return (
    <NavigationContainer>
      {initializing ? <Initializing /> : <RootNavigator />}
    </NavigationContainer>
  );
};

export default App;
