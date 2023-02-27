import {FlatList, ListRenderItem} from 'react-native';
import React, {FC, useCallback} from 'react';
import ChannelItem from './ChannelItem';

export type Channel = {
  name: string;
};

type Props = {
  onChannelPress: (channel: Channel) => void;
  onChannelLongPress?: (channel: Channel) => void;
  data: Channel[];
};

const ChannelList: FC<Props> = ({
  onChannelPress,
  onChannelLongPress,
  ...props
}) => {
  const handleChannelPress = useCallback(
    (channel: Channel) => {
      onChannelPress(channel);
    },
    [onChannelPress],
  );

  const handleChannelLongPress = useCallback(
    (channel: Channel) => {
      onChannelLongPress?.(channel);
    },
    [onChannelLongPress],
  );

  const renderItem: ListRenderItem<Channel> = useCallback(
    ({item}) => {
      return (
        <ChannelItem
          channel={item}
          onPress={handleChannelPress}
          onLongPress={handleChannelLongPress}
        />
      );
    },
    [handleChannelLongPress, handleChannelPress],
  );

  return <FlatList {...props} renderItem={renderItem} />;
};

export default ChannelList;
