import { Audio } from 'expo-av';

let backgroundMusic;

export const playBackgroundMusic = async () => {
  if (backgroundMusic) {
    await backgroundMusic.stopAsync();
    await backgroundMusic.unloadAsync();
  }

  const { sound } = await Audio.Sound.createAsync(
    require('../assets/drugsnbass.mp3'),
    { isLooping: true }
  );

  backgroundMusic = sound;
  await backgroundMusic.playAsync();
};

export const stopBackgroundMusic = async () => {
  if (backgroundMusic) {
    await backgroundMusic.stopAsync();
    await backgroundMusic.unloadAsync();
  }
};
