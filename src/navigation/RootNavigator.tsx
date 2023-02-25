import React, {FC} from 'react';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import {StyleSheet, View} from 'react-native';
import {useUserStore} from '../store/userStore';

const RootNavigator: FC = () => {
  const user = useUserStore(state => state.user);

  const isLoggedIn = !!user;

  return (
    <View style={styles.container}>
      {isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RootNavigator;
