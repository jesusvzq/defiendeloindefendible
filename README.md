# Defiende lo Indefendible

Juego de fiesta para dos jugadores. Un jugador recibe en secreto una afirmación
absurda y tiene que defenderla contra reloj; el otro escucha, pregunta y
decide si le ha convencido.

App local, sin backend ni cuentas — todo el estado vive en el navegador
(`localStorage`).

## Desarrollo

```bash
npm install
npm run dev      # servidor de desarrollo
npm run test     # tests unitarios (Vitest) de la lógica de juego
npm run build    # build de producción
```

Requiere Node 20+ (usa `nvm use` si tienes `.nvmrc` instalado).

## Estructura

- `src/game/` — lógica pura del juego (reducer, turnos, estadísticas, persistencia).
- `src/hooks/` — `useGame` (estado + persistencia) y `useCountdown` (temporizador).
- `src/components/` — una pantalla por fase del juego.
- `src/data/statements.ts` — banco de afirmaciones (de momento solo unas pocas
  de ejemplo; la colección final se añadirá más adelante).
