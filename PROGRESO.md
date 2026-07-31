# 🎲 La OCAsión — App Móvil: Progreso del Proyecto

> **Para el compañero:** Este fichero resume el estado actual del proyecto, lo que ya está hecho y lo que queda. Léelo entero antes de tocar nada.

---

## 📍 Estado general

| Fase | Estado | Detalle |
|------|--------|---------|
| Versión web | ✅ Completa | Funcional en `../La OCAsión web/juego-oca-codigo` |
| Diseño / Mockup | ✅ Completa | Ver `mockup-screens.png` |
| Plan de implementación | ✅ Completa | Ver `PLAN-IMPLEMENTACION.md` |
| Setup del proyecto RN | ⬜ Pendiente | — |
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

_(nada en este momento)_

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
