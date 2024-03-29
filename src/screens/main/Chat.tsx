import React, {useCallback} from 'react';
import {RouteProp} from '@react-navigation/native';
import {AppStackParamList} from '../../navigation/ChatNavigator';
import {NavigationKeys} from '../../navigation/NavigationKeys';
import {FC, useEffect, useState} from 'react';
import {usePubNub} from 'pubnub-react';

import Pubnub from 'pubnub';
import {useUserStore} from '../../store/userStore';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import {
  historyToMessages,
  subscriptionToMessage,
} from '../../utils/dataTransformers';

type Props = {
  route: RouteProp<AppStackParamList, NavigationKeys.Chat>;
};

const Chat: FC<Props> = ({route}) => {
  const user = useUserStore(state => state.user);

  const userId = user!!.uid; // we know user is not null here

  const {channelId} = route.params;

  const pubnub = usePubNub();

  const [messages, setMessages] = useState<Array<IMessage>>([]);

  useEffect(() => {
    let shouldSetMessages = true;

    const fetchHistory = async () => {
      try {
        const response = await pubnub.fetchMessages({
          channels: [channelId],
          includeUUID: true,
          count: 50,
        });

        if (!shouldSetMessages) {
          return;
        }

        const historyMessages = await historyToMessages(response, channelId);

        setMessages(historyMessages);
      } catch (e) {
        console.log('error fetching history', e);
      }
    };

    fetchHistory();

    return () => {
      shouldSetMessages = false;
    };
  }, [pubnub, channelId]);

  const fetchMore = useCallback(async () => {
    const oldestMessage = messages[0];

    if (!oldestMessage) {
      return;
    }

    const oldestMessageCreatedAt =
      typeof oldestMessage.createdAt === 'object'
        ? Number(oldestMessage.createdAt.getTime() * 1000)
        : oldestMessage.createdAt * 1000;

    const response = await pubnub.fetchMessages({
      channels: [channelId],
      includeUUID: true,
      count: 50,
      start: oldestMessageCreatedAt,
    });

    const newMessages = await historyToMessages(response, channelId);

    setMessages(prevMessages => [...prevMessages, ...newMessages]);
  }, [pubnub, channelId, messages]);

  const onSend = useCallback(
    async (messagesToSend: IMessage[]) => {
      if (messagesToSend.length > 0) {
        await pubnub.publish({
          channel: channelId,
          message: messagesToSend[0].text,
        });
      }
    },
    [pubnub, channelId],
  );

  useEffect(() => {
    const handleMessage = async (messageEvent: Pubnub.MessageEvent) => {
      const message = await subscriptionToMessage(messageEvent);

      setMessages(prevMessages => [message, ...prevMessages]);
    };

    const listenerParams = {
      message: handleMessage,
    };

    pubnub.addListener(listenerParams);
    pubnub.subscribe({channels: [channelId]});

    return () => {
      pubnub.unsubscribe({channels: [channelId]});
      pubnub.removeListener(listenerParams);
    };
  }, [channelId, pubnub]);

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      onLoadEarlier={fetchMore}
      renderUsernameOnMessage
      user={{
        _id: userId,
      }}
      alignTop={true}
      initialText={''}
    />
  );
};

export default Chat;
