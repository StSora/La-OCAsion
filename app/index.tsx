import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <Text style={styles.logo}>🪿🍺</Text>
        <Text style={styles.title}>La OCAsión</Text>
        <Text style={styles.subtitle}>El juego de la oca para adultos</Text>
      </View>

      <Pressable style={styles.startButton} onPress={() => router.push('/setup')}>
        <Text style={styles.startButtonText}>Empezar partida</Text>
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
    gap: 8,
  },
  logo: {
    fontSize: 72,
    marginBottom: 8,
  },
  title: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '700',
  },
  subtitle: {
    color: '#ffffffaa',
    fontSize: 15,
  },
  startButton: {
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
