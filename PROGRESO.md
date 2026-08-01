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
| Lógica del juego portada | 🟧 En progreso | Falta poner las correcciones propuestas en el chat de wssp con Alex |
| Pantalla: Inicio/Splash | 🟧 En progreso | Falta personalizar con marca |
| Pantalla: Configurar jugadores | 🟧 En progreso | Simplificar más |
| Pantalla: Tablero | 🟧 En progreso | Mejorar distribución y poner imagenes juego real |
| Pantalla: CardModal / BottomSheet | ✅ Completa | — |
| Pantalla: Ganador | ⬜✅ Completa | La frase quizás podróia cambiarse a "@Jugador ha acabado en etílico... pero ha ganado!" |
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

### 2026-08-01 — Pantalla del ganador y tarjeta de casilla.
- Tarjeta modal de cada casilla una vez caes.
- Pantalla del ganador.
---

## 🔄 En progreso

- Lógica del juego portada
- Pantalla: Inicio/Splash
- Pantalla: Configurar jugadores
- Pantalla: Tablero
---

## ⬜ Pendiente

### FASE 0 — Setup (estimado: 1-2h)
- [x] Inicializar proyecto con Expo + TypeScript (`create-expo-app`, SDK 54) — ver nota en "En progreso"
- [x] Instalar dependencias base (ver plan)
- [x] Configurar estructura de carpetas
- [x] Copiar `boardData.ts` y `useGame.tsx` del web (adaptación mínima)

### FASE 1 — Navegación y estructura (estimado: 1h)
- [x] Configurar `expo-router` con archivo `app/_layout.tsx`
- [x] Crear rutas: `/` (home), `/setup` (jugadores), `/game` (tablero)

### FASE 2 — Pantallas (estimado: 4-6h)
- [x] `HomeScreen` — Splash con logo y botón "Empezar partida"
- [x] `SetupScreen` — Configurador de jugadores (nombre + color)
- [x] `GameScreen` — Tablero + dado + log de partida
- [x] `WinnerScreen` — Pantalla de ganador con confeti

### FASE 3 — Componentes del juego (estimado: 4-6h)
- [x] `Board` — Grid 10×7 con lógica de espiral
- [x] `Square` — Casilla individual (especiales, oca, meta)
- [x] `DiceRoller` — Dado animado con Reanimated
- [ ] `CardModal` — BottomSheet con el reto/efecto de la casilla
- [x] `PlayerToken` — Fichas de jugadores sobre el tablero

### FASE 4 — Diseño y animaciones (estimado: 2-3h)
- [x] Sistema de colores/tokens en `src/theme.ts`
- [x] Tipografías con `expo-font` (Inter)
- [x] Animación de dado (rotación)
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
