// CoinComponent.js
import React from 'react';
import { View } from 'react-native';

const CoinComponent = ({ position }) => {
  return (
    <View style={{ position: 'absolute', left: position.x, top: position.y, width: 10, height: 10, backgroundColor: 'gold', borderRadius: 5 }}>
      {/* Implementação da moeda */}
    </View>
  );
};

export default CoinComponent;
