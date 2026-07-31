# 🎲 La OCAsión — App Móvil: Progreso del Proyecto

> **Para el compañero:** Este fichero resume el estado actual del proyecto, lo que ya está hecho y lo que queda. Léelo entero antes de tocar nada.

---

## 📍 Estado general

| Fase | Estado | Detalle |
|------|--------|---------|
| Versión web | ✅ Completa | Funcional en `../La OCAsión web/juego-oca-codigo` |
| Diseño / Mockup | ✅ Completa | Ver `mockup-screens.png` |
| Plan de implementación | ✅ Completa | Ver `PLAN-IMPLEMENTACION.md` |
| Setup del proyecto RN | ✅ Completa | Expo SDK 54, plantilla por defecto (`create-expo-app`). Expo Go funcionando correctamente en móvil real. Ver nota en "En progreso". |
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

### 2026-07-31 — Base del proyecto RN creada desde cero (SDK 54)
Se probó primero con un scaffold en Expo SDK 57 (traído de un proyecto que Alfon ya tenía arrancado), pero **Expo Go de la App Store todavía no soporta SDK 57** (va con retraso respecto al SDK más reciente) y eso bloqueaba las pruebas en iPhone físico sin cuenta de pago de Apple Developer. Se descartó ese scaffold y se ha vuelto a generar el proyecto de cero con `npx create-expo-app@latest` (plantilla por defecto, con tabs) ya en **Expo SDK 54**, que sí está soportado por la Expo Go actual de la App Store.

**Estado real ahora mismo — importante, léelo antes de seguir:**
- Esto es la app por defecto de Expo, tal cual sale de la plantilla (`app/(tabs)/`, `HelloWave`, `ParallaxScrollView`, etc.). **No se ha empezado nada del juego todavía.**
- Expo Go funciona correctamente para probar en móvil (Android e iPhone), que era el bloqueante que había antes.
- Al recrear el proyecto de cero se perdió el histórico de git anterior de esta carpeta (commits y rama `feat/rn-expo-scaffold` que se habían subido a este repo) — sigue existiendo en GitHub, pero esta carpeta local ya no está conectada a ningún remoto. Hay que decidir cómo reconectarla (nueva rama a partir de esto, o forzar sobre `feat/rn-expo-scaffold`) antes de perder este avance también.

**Siguiente paso: continuar migrando la lógica de la versión web a esta base de React Native.**

**Puntos a acordar antes de seguir con FASE 1 en adelante:**
1. `useGame.tsx` y `boardData.ts` de la web no están en ningún repo compartido (solo en local de StSora) — hace falta subirlos (aquí mismo, p.ej. en `web/`, o donde prefiráis) para poder portarlos.
2. NativeWind vs quedarnos con `StyleSheet` + los componentes `ThemedText`/`ThemedView` que ya trae la plantilla — a decidir antes de FASE 4.
3. El plan actual solo contempla partida en un móvil (pasar el turno). Alfon también quiere un modo online con una sesión por jugador en tiempo real — no bloquea la FASE 0-2, pero conviene tenerlo en mente en el diseño del motor de juego para no tener que reescribirlo luego.

---

## ⬜ Pendiente

### FASE 0 — Setup (estimado: 1-2h)
- [x] Inicializar proyecto con Expo + TypeScript (`create-expo-app`, SDK 54) — ver nota en "En progreso"
- [ ] Instalar dependencias base (ver plan)
- [ ] Configurar estructura de carpetas
- [ ] Copiar `boardData.ts` y `useGame.tsx` del web (adaptación mínima)
- [ ] Reconectar esta carpeta al repo remoto (se perdió al recrear el proyecto de cero)

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
# 1. Clonar el repo (el proyecto Expo vive en la raíz, no hay carpeta app/ intermedia)
git clone https://github.com/StSora/La-OCAsion.git

# 2. Instalar dependencias
cd La-OCAsion
npm install

# 3. Arrancar Expo
npx expo start

# 4. Abrir en simulador o con Expo Go en el móvil
```

> ⚠️ Ahora mismo esta carpeta local (la de Alfon) no tiene remoto configurado — el paso "clonar" de arriba todavía no refleja el estado actual de este proyecto en SDK 54. Pendiente de resolver (ver "En progreso").

---

*Última actualización: 2026-07-31*
