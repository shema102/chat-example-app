import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {usePubNub} from 'pubnub-react';
import {NavigationProp} from '@react-navigation/native';
import {AppStackParamList} from '../../navigation/ChatNavigator';
import NewChatChannelDialog from '../../components/NewChatChannelDialog';
import ChannelList, {Channel} from '../../components/ChannelList/ChannelList';
import {NavigationKeys} from '../../navigation/NavigationKeys';

type Props = {
  navigation: NavigationProp<AppStackParamList>;
};

const ChatList: FC<Props> = ({navigation}) => {
  const pubnub = usePubNub();

  const [channels, setChannels] = useState<Array<string>>([]);

  const updateChannels = useCallback(async () => {
    const response = await pubnub.channelGroups.listChannels({
      channelGroup: 'awesome-group',
    });
    setChannels(response.channels);
  }, [pubnub]);

  const createChannel = useCallback<(name: string) => Promise<void>>(
    async (name: string) => {
      await pubnub.channelGroups.addChannels({
        channelGroup: 'awesome-group',
        channels: [name],
      });
      await updateChannels();
    },
    [pubnub.channelGroups, updateChannels],
  );

  const [newChannelModalVisible, setNewChannelModalVisible] = useState(false);

  const showCreateChannelModal = useCallback(() => {
    setNewChannelModalVisible(true);
  }, []);

  const hideCreateChannelModal = useCallback(() => {
    setNewChannelModalVisible(false);
  }, []);

  const HeaderButtons = useMemo(() => {
    return <IconButton icon={'plus'} onPress={showCreateChannelModal} />;
  }, [showCreateChannelModal]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => HeaderButtons,
    });
  }, [HeaderButtons, navigation]);

  useEffect(() => {
    updateChannels();
  }, [pubnub, updateChannels]);

  const openChat = useCallback(
    (channel: Channel) => {
      navigation.navigate(NavigationKeys.Chat, {channelId: channel.name});
    },
    [navigation],
  );

  const deleteChannel = useCallback(
    async (channel: Channel) => {
      await pubnub.channelGroups.removeChannels({
        channelGroup: 'awesome-group',
        channels: [channel.name],
      });
      await updateChannels();
    },
    [pubnub.channelGroups, updateChannels],
  );

  const showDeleteChannelAlert = useCallback(
    async (channel: Channel) => {
      Alert.alert(
        'Delete channel',
        `Are you sure you want to delete channel ${channel.name}?`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {text: 'OK', onPress: () => deleteChannel(channel)},
        ],
      );
    },
    [deleteChannel],
  );

  return (
    <View style={styles.container}>
      <ChannelList
        onChannelPress={openChat}
        onChannelLongPress={showDeleteChannelAlert}
        data={channels.map(channel => ({name: channel}))}
      />

      {newChannelModalVisible && (
        <NewChatChannelDialog
          onConfirm={createChannel}
          onDismiss={hideCreateChannelModal}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
});

export default ChatList;
