// GameScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Button, StyleSheet } from 'react-native';
import MapComponent from '../components/MapComponent';
import PlayerComponent from '../components/PlayerComponent';
import GhostComponent from '../components/GhostComponent';
import CoinComponent from '../components/CoinComponent';
import { setupGame, movePlayer, checkCollisionWithCoins, checkCollisionWithGhosts } from '../utils/GameLogic';

const GameScreen = () => {
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [ghostPositions, setGhostPositions] = useState([]);
  const [coinPositions, setCoinPositions] = useState([]);

  useEffect(() => {
    const initializeGame = async () => {
      const { playerPosition, ghostPositions, coinPositions } = await setupGame();
      setPlayerPosition(playerPosition);
      setGhostPositions(ghostPositions || []);
      setCoinPositions(coinPositions || []);
    };
    initializeGame();
  }, []);

  useEffect(() => {
    const handleCollision = () => {
      if (checkCollisionWithGhosts(playerPosition, ghostPositions)) {
        setGameOver(true);
        Alert.alert('Game Over', 'Você foi pego por um fantasma! Deseja reiniciar o jogo?', [
          { text: 'Sim', onPress: resetGame },
          { text: 'Não', onPress: () => console.log('Jogo encerrado') }
        ]);
      } else {
        const collectedCoinIndex = checkCollisionWithCoins(playerPosition, coinPositions);
        if (collectedCoinIndex !== -1) {
          setScore(score + 1);
          const updatedCoins = [...coinPositions];
          updatedCoins.splice(collectedCoinIndex, 1);
          setCoinPositions(updatedCoins);
        }
      }
    };

    if (!gameOver) {
      handleCollision();
    }
  }, [playerPosition, ghostPositions, coinPositions]);

  const resetGame = async () => {
    setGameOver(false);
    setScore(0);
    const { playerPosition, ghostPositions, coinPositions } = await setupGame();
    setPlayerPosition(playerPosition);
    setGhostPositions(ghostPositions || []);
    setCoinPositions(coinPositions || []);
  };

  const handleMove = (direction) => {
    if (!gameOver) {
      const newPosition = movePlayer(playerPosition, direction);
      setPlayerPosition(newPosition);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MapComponent />
      <PlayerComponent position={playerPosition} />
      {ghostPositions.map((position, index) => (
        <GhostComponent key={index} position={position} />
      ))}
      {coinPositions.map((position, index) => (
        <CoinComponent key={index} position={position} />
      ))}
      <Text style={{ position: 'absolute', top: 10, right: 10, fontSize: 20 }}>Score: {score}</Text>
      
      {/* Controle de movimentação */}
      <View style={styles.controls}>
        <View style={styles.controlRow}>
          <Button title="Up" onPress={() => handleMove('UP')} />
        </View>
        <View style={styles.controlRow}>
          <Button title="Left" onPress={() => handleMove('LEFT')} />
          <Button title="Right" onPress={() => handleMove('RIGHT')} />
        </View>
        <View style={styles.controlRow}>
          <Button title="Down" onPress={() => handleMove('DOWN')} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  controls: {
    position: 'absolute',
    bottom: 50,
    left: 50,
    right: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlRow: {
    flexDirection: 'row',
    margin: 5,
  },
});

export default GameScreen;
