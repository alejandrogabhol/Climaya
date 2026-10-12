import { describeWeather } from '../utils/weatherCodes.js'

export default function CurrentWeather({ city, current, unit }) {
  const { label, icon } = describeWeather(current.weather_code)
  const symbol = unit === 'celsius' ? '°C' : '°F'
  const place = [city.name, city.region, city.country]
    .filter(Boolean)
    .join(', ')

  return (
    <section className="card current" aria-live="polite">
      <h2>{place}</h2>
      <div className="current-main">
        <span className="big-icon" aria-hidden="true">
          {icon}
        </span>
        <div>
          <p className="temp">
            {Math.round(current.temperature_2m)}
            {symbol}
          </p>
          <p className="label">{label}</p>
        </div>
      </div>
      <dl className="details">
        <div>
          <dt>Sensación</dt>
          <dd>
            {Math.round(current.apparent_temperature)}
            {symbol}
          </dd>
        </div>
        <div>
          <dt>Humedad</dt>
          <dd>{current.relative_humidity_2m}%</dd>
        </div>
        <div>
          <dt>Viento</dt>
          <dd>{Math.round(current.wind_speed_10m)} km/h</dd>
        </div>
      </dl>
    </section>
  )
}
