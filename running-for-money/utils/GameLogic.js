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

export const setupGame = async () => {
  const playerPosition = { x: 150, y: 150 }; // Center position assuming map is 300x300
  const ghostPositions = [
    { x: 0, y: 0 },
    { x: 0, y: 300 },
    { x: 300, y: 0 },
    { x: 300, y: 300 },
  ];
  const coinPositions = [
    { x: 100, y: 100 },
    { x: 200, y: 200 },
    { x: 100, y: 200 },
    { x: 200, y: 100 },
  ];
  return { playerPosition, ghostPositions, coinPositions };
};
