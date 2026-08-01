import { useState } from 'react';
import { router } from 'expo-router';
import { useHeaderHeight } from '@react-navigation/elements';
import {
  KeyboardAvoidingView,
  Platform,
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
  const headerHeight = useHeaderHeight();
  const [drafts, setDrafts] = useState<PlayerDraft[]>(() => createDrafts(MIN_PLAYERS));
  const [openPicker, setOpenPicker] = useState<number | null>(null);

  const update = (index: number, patch: Partial<PlayerDraft>) =>
    setDrafts((prev) => prev.map((d, i) => (i === index ? { ...d, ...patch } : d)));

  const addPlayer = () => {
    if (drafts.length >= MAX_PLAYERS) return;
    const used = new Set(drafts.map((d) => d.colorId));
    const colorId = PLAYER_COLORS.find((c) => !used.has(c.id))?.id ?? PLAYER_COLORS[0].id;
    setDrafts((prev) => [...prev, { name: `Jugador ${prev.length + 1}`, colorId }]);
  };

  const removePlayer = (index: number) => {
    if (drafts.length <= MIN_PLAYERS) return;
    setDrafts((prev) => prev.filter((_, i) => i !== index));
    setOpenPicker(null);
  };

  const selectColor = (index: number, colorId: string) => {
    update(index, { colorId });
    setOpenPicker(null);
  };

  const onStart = () => {
    game.start(drafts);
    router.push('/game');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? headerHeight : 0}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>La OCAsión</Text>
        <Text style={styles.subtitle}>De 3 a 8 jugadores, todos en el mismo móvil.</Text>

        {drafts.map((draft, index) => {
          const color = PLAYER_COLORS.find((c) => c.id === draft.colorId)?.value;
          const pickerOpen = openPicker === index;
          return (
            <View key={index} style={styles.playerCard}>
              <View style={styles.playerRow}>
                <Pressable
                  style={[styles.avatar, { backgroundColor: color }]}
                  onPress={() => setOpenPicker(pickerOpen ? null : index)}
                />
                <TextInput
                  value={draft.name}
                  maxLength={16}
                  onChangeText={(text) => update(index, { name: text })}
                  placeholder={`Jugador ${index + 1}`}
                  placeholderTextColor="#ffffff55"
                  style={styles.input}
                />
                {drafts.length > MIN_PLAYERS && (
                  <Pressable
                    style={styles.removeButton}
                    hitSlop={10}
                    onPress={() => removePlayer(index)}>
                    <Text style={styles.removeButtonText}>×</Text>
                  </Pressable>
                )}
              </View>

              {pickerOpen && (
                <View style={styles.colorPicker}>
                  {PLAYER_COLORS.map((c) => {
                    const taken = drafts.some((d, i) => i !== index && d.colorId === c.id);
                    const selected = draft.colorId === c.id;
                    return (
                      <Pressable
                        key={c.id}
                        disabled={taken}
                        onPress={() => selectColor(index, c.id)}
                        style={[
                          styles.colorSwatch,
                          { backgroundColor: c.value },
                          selected && styles.colorSwatchSelected,
                          taken && styles.colorSwatchTaken,
                        ]}
                      />
                    );
                  })}
                </View>
              )}
            </View>
          );
        })}

        {drafts.length < MAX_PLAYERS && (
          <Pressable style={styles.addButton} onPress={addPlayer}>
            <Text style={styles.addButtonText}>+</Text>
          </Pressable>
        )}

        <Pressable style={styles.startButton} onPress={onStart}>
          <Text style={styles.startButtonText}>Empezar partida</Text>
        </Pressable>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#14171c',
  },
  flex: {
    flex: 1,
  },
  scroll: {
    padding: 20,
    gap: 12,
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
  playerCard: {
    padding: 10,
    borderRadius: 18,
    backgroundColor: '#ffffff0d',
    borderWidth: 1,
    borderColor: '#ffffff1a',
    gap: 10,
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 6,
  },
  removeButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    color: '#ffffff77',
    fontSize: 20,
    lineHeight: 20,
  },
  colorPicker: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    padding: 12,
    borderRadius: 14,
    backgroundColor: '#ffffff14',
  },
  colorSwatch: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  colorSwatchSelected: {
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  colorSwatchTaken: {
    opacity: 0.25,
  },
  addButton: {
    height: 56,
    borderRadius: 18,
    backgroundColor: '#E8730C26',
    borderWidth: 1,
    borderColor: '#E8730C66',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#F5A25C',
    fontSize: 26,
    fontWeight: '700',
    lineHeight: 26,
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
