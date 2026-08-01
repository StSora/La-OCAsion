import { useCallback, useState } from 'react';

import { BOARD, PLAYER_COLORS, resolveText } from '@/game/board-data';

export interface Player {
  id: number;
  name: string;
  color: string;
  colorId: string;
  position: number;
  skipTurns: number;
  trapped: boolean;
}

export interface LogEntry {
  id: number;
  text: string;
  color: string;
}

export interface CardInfo {
  square: number;
  name: string;
  icon?: string;
  text: string;
  playerName: string;
  color: string;
  effect?: string;
}

export interface PlayerDraft {
  name: string;
  colorId: string;
}

export function createDrafts(count: number): PlayerDraft[] {
  return Array.from({ length: count }, (_, i) => ({
    name: `Jugador ${i + 1}`,
    colorId: PLAYER_COLORS[i % PLAYER_COLORS.length].id,
  }));
}

function bounce(target: number) {
  return target > 63 ? 63 - (target - 63) : target;
}

/** Pausa entre ver el número del dado y que aparezca la tarjeta del reto. */
const CARD_DELAY = 550;

export function useGame() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [started, setStarted] = useState(false);
  const [turn, setTurn] = useState(0);
  const [dice, setDice] = useState<number | null>(null);
  const [rolling, setRolling] = useState(false);
  const [winner, setWinner] = useState<Player | null>(null);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [card, setCard] = useState<CardInfo | null>(null);

  const pushLog = useCallback((text: string, color: string) => {
    setLog((prev) => [{ id: Date.now() + Math.random(), text, color }, ...prev].slice(0, 40));
  }, []);

  const start = useCallback((drafts: PlayerDraft[]) => {
    setPlayers(
      drafts.map((d, i) => ({
        id: i,
        name: d.name.trim() || `Jugador ${i + 1}`,
        color: PLAYER_COLORS.find((c) => c.id === d.colorId)?.value ?? PLAYER_COLORS[i].value,
        colorId: d.colorId,
        position: 0,
        skipTurns: 0,
        trapped: false,
      })),
    );
    setTurn(0);
    setDice(null);
    setWinner(null);
    setLog([]);
    setCard(null);
    setStarted(true);
  }, []);

  const reset = useCallback(() => {
    setStarted(false);
    setPlayers([]);
    setWinner(null);
    setLog([]);
    setDice(null);
    setCard(null);
  }, []);

  const advanceTurn = useCallback((from: number, total: number) => {
    setTurn((from + 1) % total);
  }, []);

  const roll = useCallback(() => {
    if (rolling || winner || players.length === 0) return;
    const current = players[turn];
    setRolling(true);

    setTimeout(() => {
      const value = 1 + Math.floor(Math.random() * 6);
      setDice(value);
      setRolling(false);

      // Turnos perdidos / atrapado en el pozo
      if (current.skipTurns > 0) {
        setPlayers((prev) =>
          prev.map((p) => (p.id === current.id ? { ...p, skipTurns: p.skipTurns - 1 } : p)),
        );
        pushLog(`${current.name} pierde el turno (le quedan ${current.skipTurns - 1})`, current.color);
        advanceTurn(turn, players.length);
        return;
      }
      if (current.trapped) {
        pushLog(`${current.name} sigue en el pozo esperando rescate`, current.color);
        advanceTurn(turn, players.length);
        return;
      }

      let extraTurn = false;
      let landed = bounce(current.position + value);
      let message = `${current.name} saca un ${value} y avanza a la casilla ${landed}`;
      const square = BOARD[landed - 1];
      const others = players.filter((p) => p.id !== current.id).map((p) => p.name);
      const reto = square.description
        ? resolveText(square.description, current.name, others)
        : '';

      let skipTurns = 0;
      let trapped = false;
      let effect: string | undefined;
      const landedFrom = landed;

      if (square.jumpTo) {
        landed = square.jumpTo;
        message += ` · ${square.name}: ${reto}`;
        effect = `Te mueves a la casilla ${landed}`;
        if (square.type === 'oca' || square.type === 'puente' || square.type === 'dados') {
          extraTurn = true;
          effect += ' y vuelves a tirar';
        }
      } else if (square.skipTurns) {
        skipTurns = square.skipTurns;
        message += ` · ${square.name}: ${reto}`;
        effect = `Pierdes ${square.skipTurns} ${square.skipTurns === 1 ? 'turno' : 'turnos'}`;
      } else if (square.trap) {
        trapped = true;
        message += ` · ${square.name}: ${reto}`;
        effect = 'Quedas atrapado hasta que otro jugador caiga aquí';
      } else if (reto) {
        message += ` · ${square.name}: ${reto}`;
      }

      setTimeout(() => {
        setCard({
          square: landedFrom,
          name: square.name,
          icon: square.icon,
          text: reto,
          playerName: current.name,
          color: current.color,
          effect,
        });
      }, CARD_DELAY);

      setPlayers((prev) => {
        const next = prev.map((p) => {
          if (p.id !== current.id) {
            // Rescate: alguien ocupa el pozo y libera al anterior
            if (trapped && p.trapped && p.position === landed) {
              return { ...p, trapped: false };
            }
            return p;
          }
          return { ...p, position: landed, skipTurns, trapped };
        });
        return next;
      });

      pushLog(message, current.color);

      if (landed === 63) {
        setWinner({ ...current, position: 63 });
        pushLog(`🏆 ¡${current.name} ha llegado al Jardín de la Oca!`, current.color);
        return;
      }

      if (extraTurn) {
        pushLog(`${current.name} vuelve a tirar`, current.color);
        return;
      }
      advanceTurn(turn, players.length);
    }, 650);
  }, [advanceTurn, players, pushLog, rolling, turn, winner]);

  return {
    players,
    started,
    turn,
    currentPlayer: players[turn],
    dice,
    rolling,
    winner,
    log,
    card,
    closeCard: () => setCard(null),
    start,
    reset,
    roll,
  };
}
