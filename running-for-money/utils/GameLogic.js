// GameLogic.js
export const movePlayerTo = (currentPosition, targetPosition) => {
  // Simple logic to move directly to target position
  return targetPosition;
};

export const movePlayer = (currentPosition, direction) => {
  let newPosition = { ...currentPosition };
  switch (direction) {
    case 'UP':
      newPosition.y -= 10;
      break;
    case 'DOWN':
      newPosition.y += 10;
      break;
    case 'LEFT':
      newPosition.x -= 10;
      break;
    case 'RIGHT':
      newPosition.x += 10;
      break;
  }
  return newPosition;
};

export const checkCollisionWithCoins = (playerPosition, coinPositions) => {
  for (let i = 0; i < coinPositions.length; i++) {
    if (
      Math.abs(playerPosition.x - coinPositions[i].x) < 10 &&
      Math.abs(playerPosition.y - coinPositions[i].y) < 10
    ) {
      return i;
    }
  }
  return -1;
};

export const checkCollisionWithGhosts = (playerPosition, ghostPositions) => {
  for (let i = 0; i < ghostPositions.length; i++) {
    if (
      Math.abs(playerPosition.x - ghostPositions[i].x) < 10 &&
      Math.abs(playerPosition.y - ghostPositions[i].y) < 10
    ) {
      return true;
    }
  }
  return false;
};

export const moveGhosts = async (ghostPositions, playerPosition) => {
  return ghostPositions.map((ghost) => {
    // Simplified ghost movement logic towards the player
    let newGhostPosition = { ...ghost };
    if (playerPosition.x > ghost.x) {
      newGhostPosition.x += 5;
    } else if (playerPosition.x < ghost.x) {
      newGhostPosition.x -= 5;
    }
    if (playerPosition.y > ghost.y) {
      newGhostPosition.y += 5;
    } else if (playerPosition.y < ghost.y) {
      newGhostPosition.y -= 5;
    }
    return newGhostPosition;
  });
};

// GameLogic.js
const generateRandomBar = (index, totalBars) => {
  const margin = 50; // Margem para evitar que as barras fiquem muito perto das bordas
  const spaceBetweenBars = (600 - 2 * margin) / (totalBars - 1); // Espaçamento entre as barras
  const x = margin + index * spaceBetweenBars; // Posição X da barra
  const y = 250 + Math.floor(Math.random() * 100); // Posição Y aleatória entre 250 e 350
  const width = Math.floor(Math.random() * 200) + 50; // Tamanhos variados
  const height = Math.floor(Math.random() * 200) + 50; // Tamanhos variados
  return { position: { x, y }, size: { width, height } };
};

export const setupGame = async () => {
  const playerPosition = { x: 300, y: 300 }; // Centro do mapa
  const ghostPositions = [
    { x: 0, y: 0 },
    { x: 0, y: 600 },
    { x: 600, y: 0 },
    { x: 600, y: 600 },
  ];
  const coinPositions = [
    { x: 100, y: 100 },
    { x: 200, y: 200 },
    { x: 100, y: 200 },
    { x: 200, y: 100 },
    { x: 300, y: 300 },
    { x: 400, y: 400 },
    { x: 500, y: 500 },
    { x: 400, y: 200 },
    { x: 200, y: 400 },
  ];
  const totalBars = 5; // Número total de barras
  const barPositions = Array.from({ length: totalBars }, (_, index) => generateRandomBar(index, totalBars));
  return { playerPosition, ghostPositions, coinPositions, barPositions };
};
// GameLogic.js
export const checkCollisionWithBars = (position, barPositions) => {
  for (let i = 0; i < barPositions.length; i++) {
    if (
      position.x < barPositions[i].x + barPositions[i].width &&
      position.x + 20 > barPositions[i].x &&
      position.y < barPositions[i].y + barPositions[i].height &&
      position.y + 20 > barPositions[i].y
    ) {
      return true;
    }
  }
  return false;
};
