import React, {FC, useCallback, useMemo} from 'react';
import {NavigationKeys} from './NavigationKeys';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import ChatList from '../screens/main/ChatList';
import Chat from '../screens/main/Chat';
import {PubNubProvider} from 'pubnub-react';
import {useUserStore} from '../store/userStore';
import {pubnubPublishKey, pubnubSubscribeKey} from '../utils/env';
import PubNub from 'pubnub';
import {RouteProp} from '@react-navigation/native';

export type AppStackParamList = {
  [NavigationKeys.ChatList]: undefined;
  [NavigationKeys.Chat]: {channelId: string};
};

const Stack = createStackNavigator<AppStackParamList>();

const ChatNavigator: FC = () => {
  const user = useUserStore(state => state.user);

  const userId = user!!.uid; // we know user is not null here

  const pubnub = useMemo(
    () =>
      new PubNub({
        publishKey: pubnubPublishKey,
        subscribeKey: pubnubSubscribeKey,
        uuid: userId,
      }),
    [userId],
  );

  const chatOptions = useCallback<
    (props: {
      route: RouteProp<AppStackParamList, NavigationKeys.Chat>;
    }) => StackNavigationOptions
  >(
    ({route}) => ({
      title: route.params.channelId,
    }),
    [],
  );

  return (
    <PubNubProvider client={pubnub}>
      <Stack.Navigator initialRouteName={NavigationKeys.ChatList}>
        <Stack.Screen name={NavigationKeys.ChatList} component={ChatList} />
        <Stack.Screen
          options={chatOptions}
          name={NavigationKeys.Chat}
          component={Chat}
        />
      </Stack.Navigator>
    </PubNubProvider>
  );
};

export default ChatNavigator;
