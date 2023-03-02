import React, {FC} from 'react';
import {FAB} from 'react-native-paper';
import {StyleSheet} from 'react-native';

type Props = {
  onLogout: () => Promise<void>;
};

const LogoutFAB: FC<Props> = ({onLogout}) => {
  return <FAB style={styles.fab} icon="logout" onPress={onLogout} />;
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default LogoutFAB;
