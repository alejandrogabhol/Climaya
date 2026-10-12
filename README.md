# ClimaYa

Aplicación web para consultar el clima actual y el pronóstico de 6 días de cualquier ciudad del mundo. Hecha con React y Vite, sin necesidad de claves de API.

**Demo:** _(agrega aquí el enlace cuando la publiques)_

## Características

- Búsqueda de ciudades con sugerencias en tiempo real (con retardo para no saturar la API).
- Clima actual: temperatura, sensación térmica, humedad y viento.
- Pronóstico de los próximos días con probabilidad de lluvia.
- Cambio entre °C y °F.
- Ciudades recientes y preferencias guardadas en `localStorage`.
- Estados de carga y error con opción de reintentar.
- Diseño responsive y con soporte de teclado.

## Tecnologías

- React 18 (componentes, hooks, estado y efectos)
- Vite 5
- CSS puro
- API de [Open-Meteo](https://open-meteo.com/) (geocodificación y pronóstico)

## Estructura

```
src/
├── components/    # SearchBar, CurrentWeather, Forecast
├── hooks/         # useWeather (carga de datos, errores y reintentos)
├── services/      # llamadas a la API
├── utils/         # traducción de códigos del clima
├── App.jsx
└── main.jsx
```

## Cómo ejecutarlo

Requiere [Node.js](https://nodejs.org/) 18 o superior.

```bash
npm install
npm run dev
```

Para generar la versión de producción:

```bash
npm run build
npm run preview
```

## Publicación

El proyecto se despliega sin configuración extra en Vercel o Netlify: comando de build `npm run build` y carpeta de salida `dist`.

## Posibles mejoras

- Pruebas con Vitest y React Testing Library.
- Migrar a TypeScript.
- Geolocalización del navegador para detectar la ciudad automáticamente.
- Gráfica de temperatura por horas.

## Licencia

MIT
