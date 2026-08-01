import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Board } from '@/components/board';
import { Dice } from '@/components/dice';
import { useGameContext } from '@/game/game-context';
import type { Player } from '@/game/use-game';

export default function GameScreen() {
  const game = useGameContext();
  // Solo se sincroniza con game.currentPlayer al cerrar la tarjeta del reto,
  // para que la cajita de turno no cambie de jugador/color mientras aún se
  // está leyendo el reto del jugador que acaba de tirar.
  const [displayedPlayer, setDisplayedPlayer] = useState<Player | undefined>(game.currentPlayer);

  useEffect(() => {
    if (!game.started) router.replace('/');
  }, [game.started]);

  useEffect(() => {
    if (game.winner) router.push('/winner');
  }, [game.winner]);

  useEffect(() => {
    if (!displayedPlayer && game.currentPlayer) setDisplayedPlayer(game.currentPlayer);
  }, [displayedPlayer, game.currentPlayer]);

  const handleCloseCard = () => {
    game.closeCard();
    setDisplayedPlayer(game.currentPlayer);
  };

  if (!game.started || !game.currentPlayer) return null;

  const shownPlayer = displayedPlayer ?? game.currentPlayer;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tablero</Text>
        <Pressable style={styles.logButton} onPress={() => router.push('/log')}>
          <Ionicons name="list" size={20} color="#fff" />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.boardWrap}>
        <Board players={game.players} />
      </ScrollView>

      <View style={[styles.bottomBar, { backgroundColor: shownPlayer.color }]}>
        <View style={styles.turnRow}>
          <Text style={styles.turnText}>Turno de {shownPlayer.name}</Text>
        </View>

        <View style={styles.diceRow}>
          <Dice value={game.dice} rolling={game.rolling} disabled={!!game.winner} onPress={game.roll} />
        </View>
      </View>

      <Modal visible={!!game.card} transparent animationType="fade" onRequestClose={handleCloseCard}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            {game.card && (
              <>
                <Text style={styles.modalSquare}>Casilla {game.card.square}</Text>
                <Text style={styles.modalIcon}>{game.card.icon ?? '🎲'}</Text>
                <Text style={styles.modalName}>{game.card.name}</Text>
                <Text style={[styles.modalPlayer, { color: game.card.color }]}>@{game.card.playerName}</Text>
                {!!game.card.text && <Text style={styles.modalText}>{game.card.text}</Text>}
                {!!game.card.effect && <Text style={styles.modalEffect}>{game.card.effect}</Text>}
                <Pressable style={styles.modalButton} onPress={handleCloseCard}>
                  <Text style={styles.modalButtonText}>¡Hecho!</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#14171c',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  logButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ffffff33',
  },
  boardWrap: {
    padding: 16,
    flexGrow: 1,
    justifyContent: 'center',
  },
  bottomBar: {
    margin: 16,
    marginTop: 0,
    padding: 18,
    gap: 14,
    borderRadius: 24,
  },
  turnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'center',
  },
  turnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textShadowColor: '#00000055',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  diceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#1d2127',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
  },
  modalSquare: {
    color: '#ffffff88',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  modalIcon: {
    fontSize: 56,
    marginTop: 8,
  },
  modalName: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    marginTop: 8,
  },
  modalPlayer: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 4,
  },
  modalText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
    padding: 14,
    borderRadius: 14,
    backgroundColor: '#00000033',
  },
  modalEffect: {
    color: '#ffffff99',
    fontSize: 12,
    textTransform: 'uppercase',
    marginTop: 10,
    textAlign: 'center',
  },
  modalButton: {
    marginTop: 18,
    backgroundColor: '#E8730C',
    borderRadius: 14,
    paddingVertical: 12,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
});
