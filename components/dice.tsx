import { useEffect, useState } from 'react';
import { useAudioPlayer } from 'expo-audio';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const SIZE = 84;
const FACE_SIZE = SIZE * 0.72;

/** Posiciones de los puntos en una cuadrícula 3x3, como un dado real. */
const PIPS: Record<number, [number, number][]> = {
  1: [[1, 1]],
  2: [
    [0, 2],
    [2, 0],
  ],
  3: [
    [0, 2],
    [1, 1],
    [2, 0],
  ],
  4: [
    [0, 0],
    [0, 2],
    [2, 0],
    [2, 2],
  ],
  5: [
    [0, 0],
    [0, 2],
    [1, 1],
    [2, 0],
    [2, 2],
  ],
  6: [
    [0, 0],
    [0, 2],
    [1, 0],
    [1, 2],
    [2, 0],
    [2, 2],
  ],
};

function DiceFace({ value }: { value: number }) {
  const cell = FACE_SIZE / 3;
  const pipSize = FACE_SIZE * 0.16;
  const pips = PIPS[value] ?? PIPS[1];
  return (
    <View style={{ width: FACE_SIZE, height: FACE_SIZE }}>
      {pips.map(([row, col], i) => (
        <View
          key={i}
          style={{
            position: 'absolute',
            width: pipSize,
            height: pipSize,
            borderRadius: pipSize / 2,
            backgroundColor: '#14171c',
            left: col * cell + (cell - pipSize) / 2,
            top: row * cell + (cell - pipSize) / 2,
          }}
        />
      ))}
    </View>
  );
}

export function Dice({
  value,
  rolling,
  disabled,
  onPress,
}: {
  value: number | null;
  rolling: boolean;
  disabled?: boolean;
  onPress: () => void;
}) {
  const [face, setFace] = useState(value ?? 1);
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const rollSound = useAudioPlayer(require('@/assets/sounds/dice-roll.wav'));

  const handlePress = () => {
    rollSound.seekTo(0);
    rollSound.play();
    onPress();
  };

  useEffect(() => {
    if (rolling) {
      const interval = setInterval(() => setFace(1 + Math.floor(Math.random() * 6)), 90);
      rotateX.value = withRepeat(
        withTiming(rotateX.value + 360, { duration: 380, easing: Easing.linear }),
        -1,
      );
      rotateY.value = withRepeat(
        withTiming(rotateY.value + 360, { duration: 470, easing: Easing.linear }),
        -1,
      );
      scale.value = withRepeat(
        withSequence(withTiming(0.88, { duration: 220 }), withTiming(1.06, { duration: 220 })),
        -1,
        true,
      );
      return () => clearInterval(interval);
    }

    cancelAnimation(rotateX);
    cancelAnimation(rotateY);
    cancelAnimation(scale);
    if (value != null) setFace(value);
    rotateX.value = withTiming(0, { duration: 200, easing: Easing.out(Easing.cubic) });
    rotateY.value = withTiming(0, { duration: 200, easing: Easing.out(Easing.cubic) });
    scale.value = withSequence(
      withTiming(1.2, { duration: 80 }),
      withSpring(1, { damping: 11 }),
    );
  }, [rolling, value]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 300 },
      { rotateX: `${rotateX.value}deg` },
      { rotateY: `${rotateY.value}deg` },
      { scale: scale.value },
    ],
  }));

  return (
    <Pressable onPress={handlePress} disabled={disabled || rolling} hitSlop={12}>
      <Animated.View style={[styles.dice, animatedStyle, disabled && styles.diceDisabled]}>
        <DiceFace value={face} />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  dice: {
    width: SIZE,
    height: SIZE,
    borderRadius: 18,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  diceDisabled: {
    opacity: 0.4,
  },
});
