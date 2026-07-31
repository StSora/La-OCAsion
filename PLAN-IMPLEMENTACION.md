# 📱 La OCAsión — Plan de Implementación: Web → React Native

## Contexto

La versión web está construida con **TanStack Start + React 19 + TypeScript + Tailwind**. El objetivo es portar el juego a una **app móvil nativa** usando **React Native + Expo** manteniendo toda la lógica existente y mejorando la experiencia táctil.

---

## Stack tecnológico elegido

| Capa | Web (origen) | Mobile (destino) | Razón |
|------|-------------|-----------------|-------|
| Runtime | React 19 | React Native 0.76+ | Mismo paradigma |
| Bundler | TanStack Start (Vite) | Expo SDK 52 | Expo = menor fricción |
| Navegación | TanStack Router | expo-router (file-based) | Similar a Next.js |
| Estilos | Tailwind CSS | NativeWind v4 | Reutilizar clases |
| Animaciones | CSS transitions | React Native Reanimated 3 | Animaciones nativas 60fps |
| Estado | useState/hooks | useState/hooks (idéntico) | Sin cambios |
| Iconos | lucide-react | @expo/vector-icons + lucide-react-native | Mismo set |

---

## Estructura de carpetas objetivo

```
La-OCAsion/
├── app/                          ← Proyecto Expo (expo-router)
│   ├── app/
│   │   ├── _layout.tsx           ← Root layout (SafeAreaProvider, theme)
│   │   ├── index.tsx             ← Pantalla de inicio
│   │   ├── setup.tsx             ← Configurar jugadores
│   │   └── game.tsx              ← Tablero de juego
│   ├── src/
│   │   ├── components/
│   │   │   ├── Board.tsx         ← Tablero (adaptar del web)
│   │   │   ├── Square.tsx        ← Casilla individual
│   │   │   ├── DiceRoller.tsx    ← Dado animado
│   │   │   ├── CardModal.tsx     ← BottomSheet de reto
│   │   │   ├── PlayerSetup.tsx   ← Formulario de jugadores
│   │   │   └── PlayerToken.tsx   ← Ficha del jugador
│   │   ├── hooks/
│   │   │   └── useGame.tsx       ← COPIAR DEL WEB (1 cambio mínimo)
│   │   ├── lib/
│   │   │   └── boardData.ts      ← COPIAR DEL WEB SIN CAMBIOS
│   │   └── theme.ts              ← Colores y tipografías
│   ├── package.json
│   └── app.json                  ← Config Expo (nombre, íconos, splash)
├── mockup-screens.png
├── PLAN-IMPLEMENTACION.md
└── PROGRESO.md
```

---

## Fases de implementación

### FASE 0 — Setup del proyecto (1-2h)

```bash
# Dentro de La-OCAsion/
mkdir app && cd app
npx create-expo-app@latest . --template blank-typescript
npx expo install expo-router react-native-safe-area-context react-native-screens
npx expo install nativewind tailwindcss
npx expo install react-native-reanimated
npx expo install react-native-gesture-handler
npx expo install @gorhom/bottom-sheet
npx expo install expo-font @expo-google-fonts/inter
npm install lucide-react-native react-native-confetti-cannon
```

Configurar `app.json`:
```json
{
  "expo": {
    "name": "La OCAsión",
    "slug": "la-ocasion",
    "scheme": "laocasion",
    "plugins": ["expo-router"]
  }
}
```

---

### FASE 1 — Copiar y adaptar lógica (30min)

**Copiar sin modificar:**
- `boardData.ts` → copia literal, es TypeScript puro.

**Copiar con 1 cambio:**
- `useGame.tsx` → cambiar `window.setTimeout(...)` por `setTimeout(...)` (línea ~98).

---

### FASE 2 — Pantallas

#### `app/index.tsx` — Splash/Home
```tsx
// Pantalla de bienvenida con:
// - Logo animado (Lottie o emoji grande con spring animation)
// - Título "La OCAsión"
// - Subtítulo "El juego de la oca para adultos"
// - Botón "Empezar partida" → navega a /setup
```

#### `app/setup.tsx` — Configurar jugadores
Porta `PlayerSetup.tsx` del web:
- `TextInput` en lugar de `<input>`
- `TouchableOpacity` en lugar de `<button>`
- `FlatList` para la lista de jugadores
- Los color pickers son `TouchableOpacity` con `style={{ backgroundColor }}`

#### `app/game.tsx` — Tablero de juego
Layout vertical en móvil:
1. **Header** — nombre del jugador actual con color
2. **Board** — tablero scrolleable (ScrollView con zoom pinch-to-zoom)
3. **DiceRoller** — dado + botón "Tirar dado"
4. **Log** — últimas 5 entradas del log (FlatList invertida)

#### `WinnerScreen` — modal/overlay sobre game.tsx
Aparece cuando `winner !== null`:
- Overlay oscuro con confeti
- Nombre del ganador con emoji 🏆
- Botón "Nueva partida" → reset + navegar a /setup

---

### FASE 3 — Componente Board (el más complejo)

El tablero usa un grid de 10×7. En web usamos CSS Grid. En RN no existe CSS Grid, usamos **`View` con posicionamiento absoluto**:

```tsx
// Estrategia: calcular posición (x, y) de cada casilla en px
// a partir de las coordenadas (row, col) del web
const CELL_SIZE = 36; // px por casilla en móvil
const GAP = 2;

function getPosition(row: number, col: number) {
  return {
    x: col * (CELL_SIZE + GAP),
    y: row * (CELL_SIZE + GAP),
  };
}
```

El tablero completo mide `10 * 38 = 380px` × `7 * 38 = 266px`.
Cabe en pantalla con un pequeño padding. Si no cabe, envolver en `ScrollView` con `minimumZoomScale`.

---

### FASE 4 — Animaciones clave

| Elemento | Web | RN |
|---------|-----|-----|
| Dado | `animate-dice-roll` (CSS) | `useSharedValue` + `withSequence` de Reanimated |
| Ficha mover | `transition-all` | `withSpring` de Reanimated |
| Modal/card | Dialog de Radix | `@gorhom/bottom-sheet` |
| Escala casilla activa | `scale-[1.03]` | `useAnimatedStyle` con `scale` |
| Confeti ganador | — | `react-native-confetti-cannon` |

---

### FASE 5 — Build y distribución

```bash
# Instalar EAS CLI
npm install -g eas-cli
eas login

# Configurar build
eas build:configure

# Build para ambas plataformas
eas build --platform all --profile preview

# Para TestFlight (iOS)
eas submit --platform ios
```

---

## Componentes web → RN: tabla de conversión rápida

| Web | React Native |
|-----|-------------|
| `<div>` | `<View>` |
| `<span>`, `<p>`, `<h1>` | `<Text>` |
| `<input>` | `<TextInput>` |
| `<button>` | `<TouchableOpacity>` o `<Pressable>` |
| `<ul><li>` | `<FlatList>` |
| `<img>` | `<Image>` |
| CSS classes | `StyleSheet.create({})` o NativeWind |
| CSS Grid | `View` con `flexDirection: 'row'` + `flexWrap` o posición absoluta |
| `Dialog` (Radix) | `@gorhom/bottom-sheet` o `Modal` |
| `window.setTimeout` | `setTimeout` (global en RN) |
| `useNavigate` | `router.push()` de expo-router |

---

## Riesgos y consideraciones

1. **Tablero en grid**: La parte más compleja. El CSS Grid del web no existe en RN. Usar posición absoluta con coordenadas calculadas.
2. **oklch colors**: RN no soporta `oklch()`. Convertir los colores de jugadores a HEX en `theme.ts`.
3. **Emoji rendering**: Varía entre iOS y Android. Usar con precaución en casillas pequeñas.
4. **Performance del tablero**: 63 casillas con jugadores encima. Usar `React.memo` en `Square`.

---

*Creado: 2026-07-31*
