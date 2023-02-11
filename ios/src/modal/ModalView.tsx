import { Animated, Dimensions, StyleSheet, Modal, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import modalService from "./ModalService";
import EventEmitter from "./EventEmitter";

export const SCREEN_HEIGHT = Dimensions.get("window").height;


const ModalView = ({}) => {
  const [top, setTop] = useState(200);
  const [modal, setModal] = useState(null);
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    modalService.setOnShowModalListener(show);
    return () => {
      modalService.setOnShowModalListener(null);
    };
  }, []);

  useEffect(() => {
    EventEmitter.addListener(EventEmitter.TYPES.DISMISS_MODAL, handleDisMiss);
    return () => {
      EventEmitter.removeListener(
        EventEmitter.TYPES.DISMISS_MODAL,
        handleDisMiss
      );
    };
  }, [modal]);

  const show = ({ action, visible }) => {    
    const modal = {
      action,
      visible,
    };
    if (!visible) {
      Animated.spring(opacity, {
        toValue: 0,
        useNativeDriver: true,
      }).start(() => {
        setModal(null);
      });
    } else {
      Animated.spring(opacity, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
    setModal(modal);
  };

  const handleDisMiss = () => {
    Animated.spring(opacity, {
      toValue: 0,
      useNativeDriver: true,
    }).start(() => setModal(null));
  };

  const display = opacity.interpolate({
    inputRange: [0.2, 1],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  if (!modal) return null;
  

  return (
    <Modal
      transparent={true}
      animationType={"none"}
      visible={modal.visible}
      onRequestClose={handleDisMiss}
    >
      <Animated.View
        style={[
          {
            flex: 1,
            opacity,
          },
        ]}
      >
        <TouchableOpacity style={styles.background} onPress={handleDisMiss} />
      </Animated.View>
      <Animated.View
        onLayout={(e) => {
          setTop(e.nativeEvent.layout.height / 2);
        }}
        style={[
          styles.container,
          { top: SCREEN_HEIGHT / 2 - top },
          {
            transform: [
              {
                scale: display,
              },
            ],
          },
        ]}
      >
        {modal?.action}
        
      </Animated.View>
    </Modal>
  );
};

export default ModalView;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  container: {
    zIndex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    margin: 25,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
  },
});
