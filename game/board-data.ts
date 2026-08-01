export type SquareType =
  | 'normal'
  | 'oca'
  | 'puente'
  | 'posada'
  | 'dados'
  | 'pozo'
  | 'laberinto'
  | 'carcel'
  | 'muerte'
  | 'meta';

export interface BoardSquare {
  id: number;
  /** Nombre editable de la casilla */
  name: string;
  type: SquareType;
  /** Emoji que se muestra en el tablero */
  icon?: string;
  /**
   * Descripción / reto de la casilla.
   * Admite comodines: `@jugador` (jugador actual) y `@random` (otro jugador al azar).
   */
  description?: string;
  /** Casilla de destino cuando la casilla teletransporta */
  jumpTo?: number;
  /** Turnos que se pierden al caer aquí */
  skipTurns?: number;
  /** Queda bloqueado hasta que otro jugador caiga en la misma casilla */
  trap?: boolean;
}

/** Casillas especiales tipo "oca": la jarra de cerveza. */
export const JARRAS = [6, 9, 18, 27, 36, 41, 48, 59];

function nextJarra(id: number) {
  return JARRAS.find((o) => o > id) ?? 63;
}

const JARRA_FRASES: Record<number, string> = {
  6: 'De jarra en jarra y tiro otra vez por guarra',
  9: 'De jarra en jarra y tiro otra vez por guarra',
  18: 'De jarra en jarra y tiro otra vez por guarra',
  27: 'De jarra en jarra y tiro porque soy una guarra',
  36: 'De jarra en jarra y bebes por guarra',
  41: 'De jarra en jarra y tiro por guarra',
  48: 'De jarra en jarra y tiro por guarra',
  59: 'De Jarra en jarra y tiro por guarra',
};

/**
 * PERSONALIZACIÓN: edita `name`, `icon` y `description` de cualquier casilla aquí.
 * El tablero y toda la lógica se generan desde este array.
 */
const SPECIALS: Record<number, Omit<BoardSquare, 'id'>> = {
  1: { name: 'Salida', icon: '🚩', type: 'normal', description: 'Punto de partida' },
  2: { name: 'Perro', icon: '🐶', type: 'normal', description: 'Actúa como un perro (ladra, olisquea… pero no hables) durante una ronda entera' },
  3: { name: 'Gato', icon: '🐱', type: 'normal', description: 'Actúa como un gato (maúlla, lámete la pata… pero no hables) durante una ronda entera' },
  4: { name: 'Ángel o diablo', icon: '😇', type: 'normal', description: '2 verdades y una mentira: @jugador dice dos verdades y una mentira y @random tiene que adivinar. Si adivina bebes tú, si no bebe él' },
  5: { name: 'Story', icon: '📸', type: 'normal', description: '@jugador sube una story a Instagram' },
  7: { name: 'Atrás', icon: '↩️', type: 'laberinto', description: 'Vuelves dos casillas atrás', jumpTo: 5 },
  8: { name: 'Teléfono', icon: '☎️', type: 'normal', description: 'Juego del teléfono escacharrado' },
  10: { name: 'Móvil libre', icon: '📱', type: 'normal', description: 'Deja el móvil en la mesa 10 segundos y que tus compañeros hagan lo que quieran con él' },
  11: { name: 'Hielo', icon: '🧊', type: 'normal', description: 'Ronda de pasarse el hielo con la boca' },
  12: { name: 'Chupito', icon: '🥃', type: 'normal', description: 'Todos los presentes beben un trago' },
  13: { name: 'Prueba o verdad', icon: '✅', type: 'normal', description: '@jugador: ¿prueba o verdad?' },
  14: { name: 'Monja', icon: '🙏', type: 'normal', description: 'Beben los vírgenes' },
  15: { name: 'Rubi@s', icon: '👱', type: 'normal', description: 'Beben los rubi@s' },
  16: { name: 'Solteros', icon: '🚫', type: 'normal', description: 'Beben los solteros' },
  17: { name: 'Ropa interior', icon: '🩲', type: 'normal', description: 'Ronda en ropa interior' },
  19: { name: 'Botella', icon: '🍷', type: 'normal', description: 'Juego de la botella' },
  20: { name: 'Selfie', icon: '📷', type: 'normal', description: '@jugador se hace un selfie con el móvil de @random' },
  21: { name: 'Teléfono', icon: '📞', type: 'normal', description: 'Teléfono escacharrado' },
  22: { name: 'Psicólogo', icon: '🧠', type: 'normal', description: 'Jugar al psicólogo' },
  23: { name: 'Termómetro', icon: '🌡️', type: 'normal', description: 'Jugar al termómetro con @random' },
  24: { name: 'Beso', icon: '💋', type: 'normal', description: 'Besa a @random en una parte del cuerpo que empiece por su inicial' },
  25: { name: 'Cambio de silla', icon: '🔄', type: 'normal', description: 'Cambias el puesto/silla con quien tú quieras' },
  26: { name: 'Moneda', icon: '🪙', type: 'normal', description: 'Jugar a la moneda con @random' },
  28: { name: 'Vueltas', icon: '🌀', type: 'normal', description: 'Tómate dos chupitos y da cinco vueltas sobre ti mismo' },
  29: { name: 'Más de 1,65', icon: '⬆️', type: 'normal', description: 'Beben los que midan más de 1,65' },
  30: { name: 'Orgullo', icon: '🏳️‍🌈', type: 'normal', description: 'Beben los que pertenezcan al colectivo LGTBQ+' },
  31: { name: 'El más joven', icon: '🍼', type: 'normal', description: 'Bebe el más joven del grupo' },
  32: { name: 'Postura favorita', icon: '🛏️', type: 'normal', description: 'Representa tu postura sexual favorita con @random' },
  33: { name: 'Cambio de sitio', icon: '🪑', type: 'normal', description: '@jugador cambia el sitio con quien quieras' },
  34: { name: 'Castaños', icon: '👩', type: 'normal', description: 'Beben los de pelo castaño' },
  35: { name: 'Dados', icon: '🎲', type: 'dados', description: '@jugador bebe tantos shots como el número que saque en el dado' },
  37: { name: 'Menos de 1,65', icon: '⬇️', type: 'normal', description: 'Beben los que midan menos de 1,65' },
  38: { name: 'Esposas', icon: '🔗', type: 'carcel', description: 'Vas a la cárcel: pierdes 1 turno', skipTurns: 1 },
  39: { name: 'Chupito élite', icon: '🥃', type: 'normal', description: 'Chupito a lo élite a @random' },
  40: { name: 'Tres shots', icon: '🍸', type: 'normal', description: 'Repartes tres shots entre quien tú quieras' },
  42: { name: 'Parejas', icon: '💎', type: 'normal', description: 'Beben los que tienen pareja' },
  43: { name: 'Silla', icon: '🪑', type: 'normal', description: 'Cambia el puesto/silla con quien tú quieras' },
  44: { name: 'Beso', icon: '💋', type: 'normal', description: 'Darle un beso en el cuello a @random' },
  45: { name: 'Baile sensual', icon: '💃', type: 'normal', description: 'Haz un baile sensual a @random' },
  46: { name: 'Beso de tres', icon: '🧑‍🤝‍🧑', type: 'normal', description: 'Beso de tres personas: @jugador, @random y @random' },
  47: { name: 'El más mayor', icon: '👵', type: 'normal', description: 'Bebe el más mayor del grupo' },
  49: { name: 'Lo que piensas', icon: '💭', type: 'normal', description: 'Di lo que piensas de la persona que más quieres sin decir su nombre' },
  50: { name: 'Pico', icon: '😀', type: 'normal', description: 'Pico al más borracho' },
  51: { name: 'Hidalgo', icon: '⏰', type: 'normal', description: '¡Hidalgo!' },
  52: { name: 'La más tetona', icon: '🍒', type: 'normal', description: 'Bebe la más tetona' },
  53: { name: 'Pato', icon: '🦆', type: 'normal', description: '@jugador se va a la piscina' },
  54: { name: 'Cambio de ropa', icon: '👕', type: 'normal', description: 'Cambia tu ropa con @random' },
  55: { name: 'Casar, matar, follar', icon: '💀', type: 'normal', description: 'Casar, matar, follar' },
  56: { name: 'Shot', icon: '🥃', type: 'normal', description: '¡Todos shot!' },
  57: { name: 'Cremallera', icon: '🤐', type: 'normal', description: 'Yo nunca…' },
  58: { name: 'Muerte', icon: '☠️', type: 'muerte', description: 'Muerte: vuelves al inicio', jumpTo: 1 },
  60: { name: 'Micrófono', icon: '🎤', type: 'normal', description: 'Tararea una canción el más borracho' },
  61: { name: 'Melocotón', icon: '🍑', type: 'normal', description: 'Le das una nalgada a @random' },
  62: { name: 'Comentario', icon: '🗣️', type: 'normal', description: '@random dice una verdad dura tuya' },
  63: { name: 'Meta', icon: '🏆', type: 'meta', description: '¡Meta! Has ganado la partida' },
};

export const BOARD: BoardSquare[] = Array.from({ length: 63 }, (_, i) => {
  const id = i + 1;

  if (JARRAS.includes(id)) {
    return {
      id,
      name: 'Jarra',
      icon: '🍺',
      type: 'oca' as const,
      description: JARRA_FRASES[id] ?? 'De jarra en jarra y tiro por guarra',
      jumpTo: nextJarra(id),
    };
  }

  const special = SPECIALS[id];
  if (special) return { id, ...special };

  return { id, name: `Casilla ${id}`, type: 'normal' as const };
});

/**
 * Colores de jugador. Son la conversión a hex de los oklch() originales de la
 * web (React Native no soporta el espacio de color oklch).
 */
export const PLAYER_COLORS = [
  { id: 'rojo', label: 'Rojo', value: '#F22C2D' },
  { id: 'ambar', label: 'Ámbar', value: '#F2A700' },
  { id: 'esmeralda', label: 'Esmeralda', value: '#00BC7B' },
  { id: 'cian', label: 'Cian', value: '#00C3DB' },
  { id: 'azul', label: 'Azul', value: '#4777F0' },
  { id: 'violeta', label: 'Violeta', value: '#A45AE9' },
  { id: 'rosa', label: 'Rosa', value: '#F45FB0' },
  { id: 'lima', label: 'Lima', value: '#A1DE33' },
];

/** Sustituye @jugador y @random por nombres reales. @random nunca es el jugador actual. */
export function resolveText(text: string, currentName: string, otherNames: string[]) {
  const pool = [...otherNames];
  const used: string[] = [];
  return text.replace(/@jugador|@random/g, (token) => {
    if (token === '@jugador') return currentName;
    if (pool.length === 0) return used.length ? used[Math.floor(Math.random() * used.length)] : currentName;
    const idx = Math.floor(Math.random() * pool.length);
    const [pick] = pool.splice(idx, 1);
    used.push(pick);
    return pick;
  });
}
