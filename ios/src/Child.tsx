import {View, Text, Button, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import ModalService from './modal/ModalService';
import EventEmitter from './modal/EventEmitter';

const Child = ({}) => {
  const closeModal = () => {
    EventEmitter.emit('DISMISS_MODAL');
  };

  const handleModal = () => {
    ModalService.showModal({
      action: (
        <View style={styles.container}>
          <Text>There yo go!</Text>
          <TouchableOpacity onPress={closeModal} style={styles.btn}>
            <Text style={styles.text}>Close me</Text>
          </TouchableOpacity>
        </View>
      ),
    });
  };

  return <Button onPress={handleModal} title="click me" />;
};

export default Child;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 50,
    paddingVertical: 100,
  },
  btn: {
    marginTop: 30,
    width: 85,
    height: 50,
    backgroundColor: 'blue',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
});
