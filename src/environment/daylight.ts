/** Local civil time only. Keyframes interpolate through midnight without location access. */
const stops = [
  [0, '#24385f', '#283f62', '#a9c8ff', 0.46, 1],
  [4.5, '#283859', '#2c4564', '#b5c9ff', 0.5, 1],
  [6, '#efad98', '#87abb6', '#ffac80', 1.25, 0.35],
  [8, '#a4dcef', '#68bfc9', '#ffe1ae', 2.25, 0],
  [12, '#90d8ee', '#5abfc6', '#fff1c9', 2.65, 0],
  [16, '#9cdeeb', '#65bec6', '#ffdf9a', 2.35, 0],
  [18.5, '#f3b09e', '#a5b8b6', '#ffb37d', 1.75, 0.14],
  [20.5, '#656d99', '#586c93', '#ebb0c3', 0.8, 0.75],
  [22, '#293d63', '#2c4969', '#b3ccff', 0.48, 1],
  [24, '#24385f', '#283f62', '#a9c8ff', 0.46, 1],
] as const
export function daylight(date: Date) {
  const hour =
    date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600
  const i = stops.findIndex((s) => s[0] > hour)
  const a = stops[i - 1],
    b = stops[i]
  let mix = (hour - a[0]) / (b[0] - a[0])
  mix = mix * mix * (3 - 2 * mix)
  const phase =
    hour < 5.2 || hour >= 20.5
      ? 'night'
      : hour < 8
        ? 'dawn'
        : hour < 17.5
          ? 'day'
          : 'dusk'
  return {
    a,
    b,
    mix,
    hour,
    phase,
    night: a[5] + (b[5] - a[5]) * mix,
    intensity: a[4] + (b[4] - a[4]) * mix,
  } as const
}
