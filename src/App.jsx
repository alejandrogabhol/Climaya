import { useEffect, useState } from 'react'
import SearchBar from './components/SearchBar.jsx'
import CurrentWeather from './components/CurrentWeather.jsx'
import Forecast from './components/Forecast.jsx'
import { useWeather } from './hooks/useWeather.js'

const DEFAULT_CITY = {
  id: 3688689,
  name: 'Bogotá',
  region: 'Bogotá D.C.',
  country: 'Colombia',
  latitude: 4.60971,
  longitude: -74.08175,
}

const STORAGE_KEY = 'climaya:state'

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return {
      city: saved?.city ?? DEFAULT_CITY,
      unit: saved?.unit === 'fahrenheit' ? 'fahrenheit' : 'celsius',
      recent: Array.isArray(saved?.recent) ? saved.recent : [],
    }
  } catch {
    return { city: DEFAULT_CITY, unit: 'celsius', recent: [] }
  }
}

export default function App() {
  const [{ city, unit, recent }, setState] = useState(loadState)
  const { data, loading, error, retry } = useWeather(city, unit)

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ city, unit, recent })
      )
    } catch {
      // Si el almacenamiento no está disponible, la app sigue funcionando.
    }
  }, [city, unit, recent])

  function selectCity(next) {
    setState((prev) => ({
      ...prev,
      city: next,
      recent: [next, ...prev.recent.filter((c) => c.id !== next.id)].slice(0, 5),
    }))
  }

  function toggleUnit() {
    setState((prev) => ({
      ...prev,
      unit: prev.unit === 'celsius' ? 'fahrenheit' : 'celsius',
    }))
  }

  return (
    <main className="app">
      <header className="header">
        <h1>
          Clima<span>Ya</span>
        </h1>
        <button
          type="button"
          className="unit-toggle"
          onClick={toggleUnit}
          aria-label="Cambiar unidad de temperatura"
        >
          {unit === 'celsius' ? '°C' : '°F'}
        </button>
      </header>

      <SearchBar onSelect={selectCity} />

      {recent.length > 0 && (
        <div className="recent">
          <span>Recientes:</span>
          {recent.map((c) => (
            <button key={c.id} type="button" onClick={() => selectCity(c)}>
              {c.name}
            </button>
          ))}
        </div>
      )}

      {loading && !data && <p className="status">Cargando clima…</p>}

      {error && (
        <div className="status error" role="alert">
          <p>{error}</p>
          <button type="button" onClick={retry}>
            Reintentar
          </button>
        </div>
      )}

      {data && (
        <div className={loading ? 'results is-loading' : 'results'}>
          <CurrentWeather city={city} current={data.current} unit={unit} />
          <Forecast daily={data.daily} />
        </div>
      )}

      <footer className="footer">
        Datos de{' '}
        <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">
          Open-Meteo
        </a>
      </footer>
    </main>
  )
}
