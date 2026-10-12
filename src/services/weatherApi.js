const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'

async function getJson(url) {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('No se pudo conectar con el servicio del clima.')
  }
  return res.json()
}

export async function searchCities(query) {
  const params = new URLSearchParams({
    name: query,
    count: '5',
    language: 'es',
    format: 'json',
  })
  const data = await getJson(`${GEO_URL}?${params}`)
  return (data.results ?? []).map((c) => ({
    id: c.id,
    name: c.name,
    region: c.admin1 ?? '',
    country: c.country ?? '',
    latitude: c.latitude,
    longitude: c.longitude,
  }))
}

export async function getWeather({ latitude, longitude }, unit = 'celsius') {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current:
      'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m',
    daily:
      'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max',
    timezone: 'auto',
    forecast_days: '6',
    temperature_unit: unit,
  })
  return getJson(`${FORECAST_URL}?${params}`)
}
