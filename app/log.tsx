import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useGameContext } from '@/game/game-context';
import type { LogEntry } from '@/game/use-game';

export default function LogScreen() {
  const game = useGameContext();

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={game.log}
        keyExtractor={(entry) => String(entry.id)}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>Aún no hay tiradas.</Text>}
        renderItem={({ item }: { item: LogEntry }) => (
          <View style={styles.row}>
            <View style={[styles.dot, { backgroundColor: item.color }]} />
            <Text style={styles.text}>{item.text}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#14171c',
  },
  list: {
    padding: 16,
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
  },
  text: {
    flex: 1,
    color: '#ffffffdd',
    fontSize: 14,
    lineHeight: 20,
  },
  empty: {
    color: '#ffffff66',
    padding: 16,
  },
});
