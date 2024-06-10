// GameLogic.js
import { getRandomBytes } from 'expo-random';

const MAP_WIDTH = 100; // Largura do mapa
const MAP_HEIGHT = 100; // Altura do mapa

export const movePlayer = (position, direction) => {
  switch (direction) {
    case 'UP':
      return { x: position.x, y: Math.max(position.y - 1, 0) };
    case 'DOWN':
      return { x: position.x, y: Math.min(position.y + 1, MAP_HEIGHT - 1) };
    case 'LEFT':
      return { x: Math.max(position.x - 1, 0), y: position.y };
    case 'RIGHT':
      return { x: Math.min(position.x + 1, MAP_WIDTH - 1), y: position.y };
    default:
      return position;
  }
};

export const checkCollisionWithCoins = (playerPosition, coinPositions) => {
  for (let i = 0; i < coinPositions.length; i++) {
    const coin = coinPositions[i];
    if (coin.x === playerPosition.x && coin.y === playerPosition.y) {
      return i; // Retorna o índice da moeda coletada
    }
  }
  return -1; // Nenhuma colisão
};

export const checkCollisionWithGhosts = (playerPosition, ghostPositions) => {
  for (let i = 0; i < ghostPositions.length; i++) {
    const ghost = ghostPositions[i];
    if (ghost.x === playerPosition.x && ghost.y === playerPosition.y) {
      return true; // Colisão com fantasma
    }
  }
  return false; // Nenhuma colisão
};

const getRandomPosition = async () => {
  const randomBytes = await getRandomBytes(2);
  const x = randomBytes[0] % MAP_WIDTH;
  const y = randomBytes[1] % MAP_HEIGHT;
  return { x, y };
};

const generateRandomCoins = async (numCoins) => {
  const coins = [];
  for (let i = 0; i < numCoins; i++) {
    coins.push(await getRandomPosition());
  }
  return coins;
};

export const setupGame = async () => {
  const playerPosition = { x: 0, y: 0 }; // Posição inicial do jogador
  const ghostPositions = [await getRandomPosition(), await getRandomPosition()]; // Posições iniciais dos fantasmas
  const coinPositions = await generateRandomCoins(10); // Posições aleatórias das moedas
  return { playerPosition, ghostPositions, coinPositions };
};
