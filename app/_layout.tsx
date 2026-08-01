import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { GameProvider } from '@/game/game-context';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GameProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="setup" options={{ title: 'Jugadores' }} />
          <Stack.Screen name="game" options={{ headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name="winner" options={{ headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name="log" options={{ title: 'Registro' }} />
        </Stack>
      </GameProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
