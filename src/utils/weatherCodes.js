const CODES = {
  0: ['Despejado', '☀️'],
  1: ['Mayormente despejado', '🌤️'],
  2: ['Parcialmente nublado', '⛅'],
  3: ['Nublado', '☁️'],
  45: ['Niebla', '🌫️'],
  48: ['Niebla con escarcha', '🌫️'],
  51: ['Llovizna ligera', '🌦️'],
  53: ['Llovizna', '🌦️'],
  55: ['Llovizna intensa', '🌧️'],
  61: ['Lluvia ligera', '🌦️'],
  63: ['Lluvia', '🌧️'],
  65: ['Lluvia fuerte', '🌧️'],
  71: ['Nieve ligera', '🌨️'],
  73: ['Nieve', '🌨️'],
  75: ['Nieve fuerte', '❄️'],
  80: ['Chubascos ligeros', '🌦️'],
  81: ['Chubascos', '🌧️'],
  82: ['Chubascos fuertes', '⛈️'],
  95: ['Tormenta eléctrica', '⛈️'],
  96: ['Tormenta con granizo', '⛈️'],
  99: ['Tormenta fuerte con granizo', '⛈️'],
}

export function describeWeather(code) {
  const [label, icon] = CODES[code] ?? ['Condición desconocida', '🌡️']
  return { label, icon }
}
