import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, TouchableWithoutFeedback, BackHandler } from 'react-native';
import MapComponent from '../components/MapComponent';
import PlayerComponent from '../components/PlayerComponent';
import GhostComponent from '../components/GhostComponent';
import CoinComponent from '../components/CoinComponent';
import BarComponent from '../components/BarComponent';
import { setupGame, movePlayerTo, checkCollisionWithCoins, checkCollisionWithGhosts, moveGhosts, checkCollisionWithBars } from '../utils/GameLogic';
import { playBackgroundMusic, stopBackgroundMusic } from '../utils/AudioManager';

const GameScreen = () => {
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [ghostPositions, setGhostPositions] = useState([]);
  const [coinPositions, setCoinPositions] = useState([]);
  const [barPositions, setBarPositions] = useState([]);

  const handleTouch = (evt) => {
    const { locationX, locationY } = evt.nativeEvent;
    handleMoveTo({ x: locationX, y: locationY });
  };

  useEffect(() => {
    const initializeGame = async () => {
      await playBackgroundMusic();
      const { playerPosition, ghostPositions, coinPositions, barPositions } = await setupGame();
      setPlayerPosition(playerPosition);
      setGhostPositions(ghostPositions || []);
      setCoinPositions(coinPositions || []);
      setBarPositions(barPositions || []);
    };
    initializeGame();
    return () => {
      stopBackgroundMusic();
    };
  }, []);

  useEffect(() => {
    const handleCollision = () => {
      if (checkCollisionWithGhosts(playerPosition, ghostPositions) || checkCollisionWithBars(playerPosition, barPositions)) {
        setGameOver(true);
        stopBackgroundMusic();
        Alert.alert(
          'Game Over',
          'Você foi pego por um fantasma ou colidiu com uma barra! Deseja reiniciar o jogo?',
          [
            { text: 'Sim', onPress: () => resetGame() },
            { text: 'Não', onPress: () => BackHandler.exitApp() }
          ]
        );
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
  }, [playerPosition, ghostPositions, coinPositions, barPositions]);

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
    await playBackgroundMusic();
    const { playerPosition, ghostPositions, coinPositions, barPositions } = await setupGame();
    setPlayerPosition(playerPosition);
    setGhostPositions(ghostPositions || []);
    setCoinPositions(coinPositions || []);
    setBarPositions(barPositions || []);
  };

  const handleMoveTo = (targetPosition) => {
    if (!gameOver) {
      const newPosition = movePlayerTo(playerPosition, targetPosition);
      if (!checkCollisionWithBars(newPosition, barPositions)) {
        setPlayerPosition(newPosition);
      }
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
          {barPositions.map((bar, index) => (
            <BarComponent key={index} position={bar.position} size={bar.size} />
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
    backgroundColor: '#000',
  },
  mapContainer: {
    position: 'relative',
    width: 600,
    height: 600,
  },
  score: {
    position: 'absolute',
    top: 10,
    right: 10,
    fontSize: 20,
    color: '#fff',
  },
});

export default GameScreen;
