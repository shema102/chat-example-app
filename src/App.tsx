import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import RootNavigator from './navigation/RootNavigator';

function App(): JSX.Element {
  return (
    <SafeAreaView style={StyleSheet.absoluteFill}>
      <StatusBar barStyle={'light-content'} />
      <RootNavigator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default App;
