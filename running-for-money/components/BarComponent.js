// BarComponent.js
import React from 'react';
import { View, StyleSheet } from 'react-native';

const BarComponent = ({ position, size }) => {
  return <View style={[styles.bar, { top: position.y, left: position.x, width: size.width, height: size.height }]} />;
};

const styles = StyleSheet.create({
  bar: {
    backgroundColor: 'purple',
    position: 'absolute',
  },
});

export default BarComponent;
