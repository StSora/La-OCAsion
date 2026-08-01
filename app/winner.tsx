import { useEffect } from 'react';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useGameContext } from '@/game/game-context';

export default function WinnerScreen() {
  const game = useGameContext();

  useEffect(() => {
    if (!game.winner) router.replace('/');
  }, [game.winner]);

  if (!game.winner) return null;

  const onNewGame = () => {
    game.reset();
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <Text style={styles.trophy}>🏆</Text>
        <View style={[styles.colorDot, { backgroundColor: game.winner.color }]} />
        <Text style={styles.name}>¡{game.winner.name} gana!</Text>
        <Text style={styles.subtitle}>Ha llegado al Jardín de la Oca.</Text>
      </View>

      <Pressable style={styles.newGameButton} onPress={onNewGame}>
        <Text style={styles.newGameButtonText}>Nueva partida</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#14171c',
    justifyContent: 'space-between',
    padding: 24,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  trophy: {
    fontSize: 96,
  },
  colorDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  name: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    color: '#ffffffaa',
    fontSize: 15,
  },
  newGameButton: {
    backgroundColor: '#E8730C',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  newGameButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
