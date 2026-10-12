import { useEffect, useState } from 'react'
import { searchCities } from '../services/weatherApi.js'

export default function SearchBar({ onSelect }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    const text = query.trim()
    if (text.length < 2) {
      setResults([])
      setStatus('idle')
      return
    }
    setStatus('loading')
    const timer = setTimeout(async () => {
      try {
        const found = await searchCities(text)
        setResults(found)
        setStatus(found.length ? 'done' : 'empty')
      } catch {
        setResults([])
        setStatus('error')
      }
    }, 350)
    return () => clearTimeout(timer)
  }, [query])

  function choose(city) {
    onSelect(city)
    setQuery('')
    setResults([])
    setStatus('idle')
  }

  return (
    <div className="search">
      <label htmlFor="city-search" className="sr-only">
        Buscar ciudad
      </label>
      <input
        id="city-search"
        type="search"
        placeholder="Buscar ciudad…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoComplete="off"
      />
      {status === 'loading' && <p className="search-hint">Buscando…</p>}
      {status === 'empty' && <p className="search-hint">Sin resultados.</p>}
      {status === 'error' && (
        <p className="search-hint">No se pudo buscar. Intenta de nuevo.</p>
      )}
      {results.length > 0 && (
        <ul className="suggestions">
          {results.map((city) => (
            <li key={city.id}>
              <button type="button" onClick={() => choose(city)}>
                <strong>{city.name}</strong>
                <span>
                  {[city.region, city.country].filter(Boolean).join(', ')}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
