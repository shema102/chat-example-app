import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

function App(): JSX.Element {
  return (
    <SafeAreaView style={StyleSheet.absoluteFill}>
      <StatusBar barStyle={'light-content'} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default App;
