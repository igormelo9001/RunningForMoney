// PlayerComponent.js
import React from 'react';
import { View, StyleSheet } from 'react-native';

const PlayerComponent = ({ position }) => {
  return (
    <View style={[styles.player, { top: position.y, left: position.x }]} />
  );
};

const styles = StyleSheet.create({
  player: {
    width: 20,
    height: 20,
    backgroundColor: '#fff', // Player color white
    position: 'absolute',
  },
});

export default PlayerComponent;
