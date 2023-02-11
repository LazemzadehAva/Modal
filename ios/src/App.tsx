import {StyleSheet, View} from 'react-native';
import React from 'react';
import Child from './Child';
import ModalView from './modal/ModalView';

const App = () => {
  return (
    <View style={styles.container}>
      <Child />
      <ModalView />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
