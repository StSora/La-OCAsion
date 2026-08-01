import { StyleSheet, Text, View } from 'react-native';

import { BOARD, type SquareType } from '@/game/board-data';
import type { Player } from '@/game/use-game';

const COLUMNS = 9;
const ROWS = 7; // 9 * 7 = 63 casillas

/** Cuadrícula en serpiente: fila par → izquierda a derecha, fila impar → derecha a izquierda. */
function getRows(): number[][] {
  const rows: number[][] = [];
  for (let r = 0; r < ROWS; r++) {
    const start = r * COLUMNS + 1;
    const ids = Array.from({ length: COLUMNS }, (_, i) => start + i);
    rows.push(r % 2 === 1 ? ids.reverse() : ids);
  }
  return rows;
}

const ROWS_LAYOUT = getRows();

const TYPE_BACKGROUND: Record<SquareType, string> = {
  normal: '#23262d',
  oca: '#5a4416',
  puente: '#1d4b52',
  posada: '#3a2e4d',
  dados: '#1d3f52',
  pozo: '#2d2d2d',
  laberinto: '#3a2e4d',
  carcel: '#3f2d2d',
  muerte: '#3a1a1a',
  meta: '#4d3e14',
};

export function Board({ players }: { players: Player[] }) {
  const tokensBySquare = new Map<number, Player[]>();
  for (const p of players) {
    const displaySquare = p.position === 0 ? 1 : p.position;
    const list = tokensBySquare.get(displaySquare) ?? [];
    list.push(p);
    tokensBySquare.set(displaySquare, list);
  }

  return (
    <View style={styles.board}>
      {ROWS_LAYOUT.map((row, i) => (
        <View key={i} style={styles.row}>
          {row.map((id) => {
            const square = BOARD[id - 1];
            const tokens = tokensBySquare.get(id) ?? [];
            return (
              <View key={id} style={[styles.square, { backgroundColor: TYPE_BACKGROUND[square.type] }]}>
                <Text style={styles.icon}>{square.icon ?? id}</Text>
                <Text style={styles.id}>{id}</Text>
                {tokens.length > 0 && (
                  <View style={styles.tokenRow}>
                    {tokens.map((p) => (
                      <View key={p.id} style={[styles.token, { backgroundColor: p.color }]} />
                    ))}
                  </View>
                )}
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    gap: 2,
  },
  row: {
    flexDirection: 'row',
    gap: 2,
  },
  square: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 14,
  },
  id: {
    position: 'absolute',
    top: 1,
    left: 2,
    fontSize: 7,
    color: '#ffffff77',
  },
  tokenRow: {
    position: 'absolute',
    bottom: 1,
    flexDirection: 'row',
    gap: 1,
  },
  token: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});
