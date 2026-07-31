# 🎲 La OCAsión — App Móvil: Progreso del Proyecto

> **Para el compañero:** Este fichero resume el estado actual del proyecto, lo que ya está hecho y lo que queda. Léelo entero antes de tocar nada.

---

## 📍 Estado general

| Fase | Estado | Detalle |
|------|--------|---------|
| Versión web | ✅ Completa | Funcional en `../La OCAsión web/juego-oca-codigo` |
| Diseño / Mockup | ✅ Completa | Ver `mockup-screens.png` |
| Plan de implementación | ✅ Completa | Ver `PLAN-IMPLEMENTACION.md` |
| Setup del proyecto RN | 🔶 Parcial | Ver nota en "En progreso" — hay que acordar SDK antes de dar por cerrada la fase |
| Lógica del juego portada | ⬜ Pendiente | — |
| Pantalla: Inicio/Splash | ⬜ Pendiente | — |
| Pantalla: Configurar jugadores | ⬜ Pendiente | — |
| Pantalla: Tablero | ⬜ Pendiente | — |
| Pantalla: CardModal / BottomSheet | ⬜ Pendiente | — |
| Pantalla: Ganador | ⬜ Pendiente | — |
| Animaciones y polish | ⬜ Pendiente | — |
| Build & distribución (TestFlight/APK) | ⬜ Pendiente | — |

---

## ✅ Completado

### 2026-07-31 — Análisis y planificación
- Analizado al completo el código de la versión web (TanStack Start + React + TypeScript + Tailwind).
- Identificados todos los componentes: `Board`, `Square`, `PlayerSetup`, `DiceRoller`, `CardModal`, `useGame`.
- Identificada la lógica pura de `useGame.tsx` y `boardData.ts` → **100% reutilizable en RN sin modificar**.
- Creado el mockup visual de 6 pantallas (ver `mockup-screens.png`).
- Creado el plan de implementación completo (ver `PLAN-IMPLEMENTACION.md`).

---

## 🔄 En progreso

### 2026-07-31 — Migración del scaffold de Alfon (`app/`, PR `feat/rn-expo-scaffold`)
Alfon ya tenía un proyecto Expo arrancado por su cuenta (con Claude Code) antes de ver este plan. En vez de recrearlo con `create-expo-app@latest` desde cero, se ha traído tal cual a `app/`:
- **Expo SDK 57** (no SDK 52 como dice el plan — SDK 52 ya no es la versión soportada, Expo ha cambiado bastante desde entonces). Los comandos/paquetes de `PLAN-IMPLEMENTACION.md` habría que revisarlos contra los docs de v57 antes de seguirlos al pie de la letra.
- `expo-router` + TypeScript + rutas tipadas ya configurados.
- Sistema de diseño propio en `src/constants/theme.ts` (`Colors`/`Spacing`/`Fonts` + componentes `ThemedText`/`ThemedView`), sin NativeWind instalado todavía.
- Todavía con la navegación por tabs por defecto de Expo (Home/Explore) — falta reemplazarla por el flujo del juego (elegir modo → setup jugadores → tablero).

**Puntos a acordar antes de seguir con FASE 1 en adelante:**
1. ¿Nos quedamos en SDK 57 (recomendado) o hay alguna razón para fijar SDK 52?
2. `useGame.tsx` y `boardData.ts` de la web no están en ningún repo compartido (solo en local de StSora) — hace falta subirlos (aquí mismo, p.ej. en `web/`, o donde prefiráis) para poder portarlos.
3. NativeWind vs el sistema de estilos que ya hay en `app/src/constants/theme.ts` — a decidir antes de FASE 4.
4. El plan actual solo contempla partida en un móvil (pasar el turno). Alfon también quiere un modo online con una sesión por jugador en tiempo real — no bloquea la FASE 0-2, pero conviene tenerlo en mente en el diseño del motor de juego para no tener que reescribirlo luego.

---

## ⬜ Pendiente

### FASE 0 — Setup (estimado: 1-2h)
- [ ] Inicializar proyecto con Expo + TypeScript: `npx create-expo-app@latest . --template blank-typescript`
- [ ] Instalar dependencias base (ver plan)
- [ ] Configurar estructura de carpetas
- [ ] Copiar `boardData.ts` y `useGame.tsx` del web (adaptación mínima)

### FASE 1 — Navegación y estructura (estimado: 1h)
- [ ] Configurar `expo-router` con archivo `app/_layout.tsx`
- [ ] Crear rutas: `/` (home), `/setup` (jugadores), `/game` (tablero)

### FASE 2 — Pantallas (estimado: 4-6h)
- [ ] `HomeScreen` — Splash con logo y botón "Empezar partida"
- [ ] `SetupScreen` — Configurador de jugadores (nombre + color)
- [ ] `GameScreen` — Tablero + dado + log de partida
- [ ] `WinnerScreen` — Pantalla de ganador con confeti

### FASE 3 — Componentes del juego (estimado: 4-6h)
- [ ] `Board` — Grid 10×7 con lógica de espiral
- [ ] `Square` — Casilla individual (especiales, oca, meta)
- [ ] `DiceRoller` — Dado animado con Reanimated
- [ ] `CardModal` — BottomSheet con el reto/efecto de la casilla
- [ ] `PlayerToken` — Fichas de jugadores sobre el tablero

### FASE 4 — Diseño y animaciones (estimado: 2-3h)
- [ ] Sistema de colores/tokens en `src/theme.ts`
- [ ] Tipografías con `expo-font` (Inter)
- [ ] Animación de dado (rotación)
- [ ] Animación de ficha al moverse
- [ ] Confeti en pantalla ganador

### FASE 5 — Build y distribución (estimado: 1-2h)
- [ ] Probar en simulador iOS y Android
- [ ] Build con EAS: `eas build --platform all`
- [ ] Subir a TestFlight (iOS) o APK interno (Android)

---

## 🗂️ Archivos importantes

| Archivo | Descripción |
|---------|-------------|
| `PLAN-IMPLEMENTACION.md` | Plan técnico detallado con decisiones de arquitectura |
| `mockup-screens.png` | Diseño visual de las 6 pantallas de la app |
| `../La OCAsión web/juego-oca-codigo/src/hooks/useGame.tsx` | Lógica del juego — copiar directamente |
| `../La OCAsión web/juego-oca-codigo/src/lib/boardData.ts` | Datos del tablero — copiar directamente |

---

## ⚠️ Decisiones tomadas

- **Expo (managed workflow)** sobre bare React Native → menos configuración, OTA updates.
- **expo-router** para navegación basada en ficheros (similar a Next.js).
- **NativeWind** para estilos (Tailwind en React Native) → coherencia con la versión web.
- **`useGame.tsx` se reutiliza sin cambios** salvo reemplazar `window.setTimeout` por `setTimeout` nativo.
- La lógica del tablero (`boardData.ts`) es puro TypeScript → copiar sin modificar.

---

## 🧑‍💻 Cómo arrancar (para el compañero)

```bash
# 1. Ir a la carpeta del proyecto RN
cd La-OCAsion/app   # (cuando esté creado)

# 2. Instalar dependencias
npm install

# 3. Arrancar Expo
npx expo start

# 4. Abrir en simulador o con Expo Go en el móvil
```

---

*Última actualización: 2026-07-31*
