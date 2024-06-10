// GhostComponent.js
import React from 'react';
import { View } from 'react-native';

const GhostComponent = ({ position }) => {
  return (
    <View style={{ position: 'absolute', left: position.x, top: position.y, width: 20, height: 20, backgroundColor: 'red' }}>
      {/* Implementação do fantasma */}
    </View>
  );
};

export default GhostComponent;
