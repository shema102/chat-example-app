import {RouteProp} from '@react-navigation/native';
import {AppStackParamList} from '../../navigation/AppNavigator';
import {NavigationKeys} from '../../navigation/NavigationKeys';
import {FC} from 'react';

type Props = {
  route: RouteProp<AppStackParamList, NavigationKeys.Chat>;
};

const Chat: FC<Props> = ({route}) => {
  const {chatId} = route.params;

  return null;
};

export default Chat;
