// PlayerComponent.js
import React from 'react';
import { View } from 'react-native';

const PlayerComponent = ({ position }) => {
  return (
    <View style={{ position: 'absolute', left: position.x, top: position.y, width: 20, height: 20, backgroundColor: 'black' }}>
      {/* Implementação do jogador */}
    </View>
  );
};

export default PlayerComponent;
