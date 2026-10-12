import { useCallback, useEffect, useState } from 'react'
import { getWeather } from '../services/weatherApi.js'

export function useWeather(city, unit) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const load = useCallback(
    async (signal) => {
      if (!city) return
      setLoading(true)
      setError('')
      try {
        const result = await getWeather(city, unit)
        if (!signal?.aborted) setData(result)
      } catch (err) {
        if (!signal?.aborted) {
          setError(err.message || 'Ocurrió un error inesperado.')
        }
      } finally {
        if (!signal?.aborted) setLoading(false)
      }
    },
    [city, unit]
  )

  useEffect(() => {
    const controller = new AbortController()
    load(controller.signal)
    return () => controller.abort()
  }, [load])

  return { data, loading, error, retry: () => load() }
}
