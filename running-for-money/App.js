// App.js
import React from 'react';
import { View } from 'react-native';
import GameScreen from './screens/GameScreen';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <GameScreen />
    </View>
  );
}
