import React, {FC} from 'react';
import {NavigationKeys} from './NavigationKeys';
import {createStackNavigator} from '@react-navigation/stack';
import ChatList from '../screens/main/ChatList';
import Chat from '../screens/main/Chat';

export type AppStackParamList = {
  [NavigationKeys.ChatList]: undefined;
  [NavigationKeys.Chat]: {chatId: string};
};

const Stack = createStackNavigator<AppStackParamList>();

const AppNavigator: FC = () => {
  return (
    <Stack.Navigator initialRouteName={NavigationKeys.ChatList}>
      <Stack.Screen name={NavigationKeys.ChatList} component={ChatList} />
      <Stack.Screen name={NavigationKeys.Chat} component={Chat} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
