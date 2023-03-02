import {IMessage} from 'react-native-gifted-chat';
import Pubnub from 'pubnub';
import {getUsernameForId} from '../hooks/useUsername';

const UsernameCache: Map<string, string> = new Map();

export const historyToMessages = async (
  history: Pubnub.FetchMessagesResponse,
  channel: string,
): Promise<Array<IMessage>> => {
  const messages = history.channels[channel];

  if (!messages) {
    return [];
  }

  const messagesWithTimetokens = messages
    .reverse()
    .filter(message => !!message.timetoken);

  const messagesWithUsernames: Array<IMessage> = [];

  for (const message of messagesWithTimetokens) {
    const createdAt: Date = new Date(
      Number.parseInt(message.timetoken as string, 10) / 10000,
    );

    const authorId = message.uuid as string;

    let username;

    if (!UsernameCache.has(authorId)) {
      username = await getUsernameForId(authorId);
      UsernameCache.set(authorId, username);
    } else {
      username = UsernameCache.get(authorId) as string;
    }

    const messageWithUsername = {
      _id: createdAt.toString() + authorId,
      text: message.message,
      createdAt,
      user: {_id: authorId, name: username},
    };

    messagesWithUsernames.push(messageWithUsername);
  }

  return messagesWithUsernames;
};

export const subscriptionToMessage = async (
  messageEvent: Pubnub.MessageEvent,
): Promise<IMessage> => {
  const createdAt: Date = new Date(
    Number.parseInt(messageEvent.timetoken, 10) / 10000,
  );

  const authorId = messageEvent.publisher;

  let username;

  if (!UsernameCache.has(authorId)) {
    username = await getUsernameForId(authorId);
    UsernameCache.set(authorId, username);
  } else {
    username = UsernameCache.get(authorId) as string;
  }

  return {
    _id: createdAt.toString() + authorId,
    text: messageEvent.message,
    createdAt,
    user: {_id: authorId, name: username},
  };
};
