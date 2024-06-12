// GameScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import MapComponent from '../components/MapComponent';
import PlayerComponent from '../components/PlayerComponent';
import GhostComponent from '../components/GhostComponent';
import CoinComponent from '../components/CoinComponent';
import { setupGame, movePlayerTo, checkCollisionWithCoins, checkCollisionWithGhosts, moveGhosts } from '../utils/GameLogic';

const GameScreen = () => {
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [ghostPositions, setGhostPositions] = useState([]);
  const [coinPositions, setCoinPositions] = useState([]);

  const handleTouch = (evt) => {
    const { locationX, locationY } = evt.nativeEvent;
    handleMoveTo({ x: locationX, y: locationY });
  };

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

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!gameOver) {
        const newGhostPositions = await moveGhosts(ghostPositions, playerPosition);
        setGhostPositions(newGhostPositions);
      }
    }, 300); // Move ghosts every 300ms for increased speed
    return () => clearInterval(interval);
  }, [ghostPositions, playerPosition, gameOver]);

  const resetGame = async () => {
    setGameOver(false);
    setScore(0);
    const { playerPosition, ghostPositions, coinPositions } = await setupGame();
    setPlayerPosition(playerPosition);
    setGhostPositions(ghostPositions || []);
    setCoinPositions(coinPositions || []);
  };

  const handleMoveTo = (targetPosition) => {
    if (!gameOver) {
      const newPosition = movePlayerTo(playerPosition, targetPosition);
      setPlayerPosition(newPosition);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleTouch}>
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <MapComponent />
          <PlayerComponent position={playerPosition} />
          {ghostPositions.map((position, index) => (
            <GhostComponent key={index} position={position} />
          ))}
          {coinPositions.map((position, index) => (
            <CoinComponent key={index} position={position} />
          ))}
        </View>
        <Text style={styles.score}>Score: {score}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  mapContainer: {
    position: 'relative',
    width: 300, // Adjust based on your map size
    height: 300, // Adjust based on your map size
  },
  score: {
    position: 'absolute',
    top: 10,
    right: 10,
    fontSize: 20,
  },
});

export default GameScreen;
