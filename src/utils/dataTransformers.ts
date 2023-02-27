import {IMessage} from 'react-native-gifted-chat';
import Pubnub from 'pubnub';

export const historyToMessages = (
  history: Pubnub.FetchMessagesResponse,
  channel: string,
): Array<IMessage> => {
  const messages = history.channels[channel];

  return messages
    .reverse()
    .filter(message => !!message.timetoken)
    .map(message => {
      const createdAt: Date = new Date(
        Number.parseInt(message.timetoken as string, 10) / 10000,
      );

      const authorId = message?.meta?.authorId;

      return {
        _id: createdAt.toString() + authorId,
        text: message.message,
        createdAt,
        user: {_id: authorId},
      };
    });
};

export const subscriptionToMessage = (
  messageEvent: Pubnub.MessageEvent,
): IMessage => {
  const createdAt: Date = new Date(
    Number.parseInt(messageEvent.timetoken, 10) / 10000,
  );

  const authorId = messageEvent?.userMetadata?.authorId;

  return {
    _id: createdAt.toString() + authorId,
    text: messageEvent.message,
    createdAt,
    user: {_id: authorId},
  };
};

export const getMessageEventId = (response: Pubnub.MessageEvent) => {
  const createdAt: Date = new Date(
    Number.parseInt(response.timetoken, 10) / 10000,
  );

  const authorId = response?.userMetadata?.authorId;

  return createdAt.toString() + authorId;
};
