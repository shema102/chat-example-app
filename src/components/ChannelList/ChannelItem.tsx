import React, {FC, useCallback} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import {Channel} from './ChannelList';
import {colors} from '../../constants/colors';

type Props = {
  channel: Channel;
  onPress: (channel: Channel) => void;
  onLongPress: (channel: Channel) => void;
};

const ChannelItem: FC<Props> = ({channel, onPress, onLongPress}) => {
  const handlePress = useCallback(() => {
    onPress(channel);
  }, [channel, onPress]);

  const handleLongPress = useCallback(() => {
    onLongPress(channel);
  }, [channel, onLongPress]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      onLongPress={handleLongPress}>
      <Text style={styles.text}>{channel.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.primary,
    marginBottom: 10,
    borderColor: colors.border,
    borderWidth: 2,
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    color: colors.text,
  },
});

export default ChannelItem;
