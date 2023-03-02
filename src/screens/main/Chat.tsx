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

        setMessages(historyToMessages(response, channelId));
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
    const response = await pubnub.fetchMessages({
      channels: [channelId],
      includeUUID: true,
      count: 50,
      start:
        typeof messages[0].createdAt === 'object'
          ? messages[0].createdAt.toString()
          : messages[0].createdAt,
    });

    setMessages(prevMessages => [
      ...prevMessages,
      ...historyToMessages(response, channelId),
    ]);
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
    const handleMessage = (messageEvent: Pubnub.MessageEvent) => {
      const alreadyExists = messages.some(
        message => message._id === getMessageEventId(messageEvent),
      );

      if (alreadyExists) {
        return;
      }

      setMessages(prevMessages => [
        subscriptionToMessage(messageEvent),
        ...prevMessages,
      ]);
    };

    pubnub.addListener({message: handleMessage});
    pubnub.subscribe({channels: [channelId]});

    return () => {
      pubnub.removeListener({message: handleMessage});
      pubnub.unsubscribeAll();
    };
  }, [pubnub, channelId, messages]);

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      onLoadEarlier={fetchMore}
      user={{
        _id: userId,
      }}
    />
  );
};

export default Chat;
