import { useState } from 'react';
import { router } from 'expo-router';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PLAYER_COLORS } from '@/game/board-data';
import { useGameContext } from '@/game/game-context';
import { createDrafts, type PlayerDraft } from '@/game/use-game';

const MIN_PLAYERS = 3;
const MAX_PLAYERS = 8;

export default function SetupScreen() {
  const game = useGameContext();
  const [drafts, setDrafts] = useState<PlayerDraft[]>(() => createDrafts(MIN_PLAYERS));

  const setCount = (count: number) => {
    if (count < MIN_PLAYERS || count > MAX_PLAYERS) return;
    setDrafts((prev) => {
      if (count < prev.length) return prev.slice(0, count);
      const used = new Set(prev.map((p) => p.colorId));
      const extra = createDrafts(count)
        .slice(prev.length)
        .map((d, i) => ({
          ...d,
          colorId: PLAYER_COLORS.find((c) => !used.has(c.id))?.id ?? d.colorId,
          name: `Jugador ${prev.length + i + 1}`,
        }));
      return [...prev, ...extra];
    });
  };

  const update = (index: number, patch: Partial<PlayerDraft>) =>
    setDrafts((prev) => prev.map((d, i) => (i === index ? { ...d, ...patch } : d)));

  const onStart = () => {
    game.start(drafts);
    router.push('/game');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>La OCAsión</Text>
        <Text style={styles.subtitle}>De 3 a 8 jugadores, todos en el mismo móvil.</Text>

        <View style={styles.counterRow}>
          <Text style={styles.label}>Número de jugadores</Text>
          <View style={styles.counterControls}>
            <Pressable
              style={styles.counterButton}
              onPress={() => setCount(drafts.length - 1)}
              disabled={drafts.length <= MIN_PLAYERS}>
              <Text style={styles.counterButtonText}>−</Text>
            </Pressable>
            <Text style={styles.counterValue}>{drafts.length}</Text>
            <Pressable
              style={styles.counterButton}
              onPress={() => setCount(drafts.length + 1)}
              disabled={drafts.length >= MAX_PLAYERS}>
              <Text style={styles.counterButtonText}>+</Text>
            </Pressable>
          </View>
        </View>

        {drafts.map((draft, index) => (
          <View key={index} style={styles.playerCard}>
            <View style={styles.playerRow}>
              <View style={[styles.colorDot, { backgroundColor: PLAYER_COLORS.find((c) => c.id === draft.colorId)?.value }]} />
              <TextInput
                value={draft.name}
                maxLength={16}
                onChangeText={(text) => update(index, { name: text })}
                placeholder={`Jugador ${index + 1}`}
                placeholderTextColor="#ffffff66"
                style={styles.input}
              />
            </View>
            <View style={styles.colorRow}>
              {PLAYER_COLORS.map((color) => {
                const taken = drafts.some((d, i) => i !== index && d.colorId === color.id);
                const selected = draft.colorId === color.id;
                return (
                  <Pressable
                    key={color.id}
                    disabled={taken}
                    onPress={() => update(index, { colorId: color.id })}
                    style={[
                      styles.colorSwatch,
                      { backgroundColor: color.value },
                      selected && styles.colorSwatchSelected,
                      taken && styles.colorSwatchTaken,
                    ]}
                  />
                );
              })}
            </View>
          </View>
        ))}

        <Pressable style={styles.startButton} onPress={onStart}>
          <Text style={styles.startButtonText}>Empezar partida</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#14171c',
  },
  scroll: {
    padding: 20,
    gap: 16,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    color: '#ffffffaa',
    textAlign: 'center',
    marginBottom: 8,
  },
  label: {
    color: '#fff',
    fontWeight: '600',
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ffffff22',
  },
  counterControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  counterButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#ffffff33',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  counterValue: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    minWidth: 28,
    textAlign: 'center',
  },
  playerCard: {
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ffffff22',
    gap: 10,
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  colorDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ffffff33',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: '#fff',
  },
  colorRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  colorSwatch: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  colorSwatchSelected: {
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  colorSwatchTaken: {
    opacity: 0.25,
  },
  startButton: {
    marginTop: 8,
    backgroundColor: '#E8730C',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
