import { describeWeather } from '../utils/weatherCodes.js'

function dayName(isoDate, index) {
  if (index === 0) return 'Hoy'
  const date = new Date(`${isoDate}T12:00:00`)
  return date.toLocaleDateString('es', { weekday: 'short' })
}

export default function Forecast({ daily }) {
  const symbol = '°'
  return (
    <section className="card" aria-label="Pronóstico de los próximos días">
      <h2>Próximos días</h2>
      <ul className="forecast">
        {daily.time.map((day, i) => {
          const { label, icon } = describeWeather(daily.weather_code[i])
          return (
            <li key={day}>
              <span className="day">{dayName(day, i)}</span>
              <span className="icon" role="img" aria-label={label}>
                {icon}
              </span>
              <span className="range">
                <strong>
                  {Math.round(daily.temperature_2m_max[i])}
                  {symbol}
                </strong>{' '}
                <span className="min">
                  {Math.round(daily.temperature_2m_min[i])}
                  {symbol}
                </span>
              </span>
              <span className="rain">
                💧 {daily.precipitation_probability_max[i] ?? 0}%
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
