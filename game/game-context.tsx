import { createContext, useContext, type ReactNode } from 'react';

import { useGame } from '@/game/use-game';

type GameContextValue = ReturnType<typeof useGame>;

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const game = useGame();
  return <GameContext.Provider value={game}>{children}</GameContext.Provider>;
}

export function useGameContext() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGameContext debe usarse dentro de GameProvider');
  return ctx;
}
