// MapComponent.js
import React from 'react';
import { View, StyleSheet } from 'react-native';

const MapComponent = () => {
  return <View style={styles.map} />;
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000', // Map color black
  },
});

export default MapComponent;
