import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';

const Initializing = () => (
  <View style={styles.container}>
    <ActivityIndicator size={'large'} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Initializing;
