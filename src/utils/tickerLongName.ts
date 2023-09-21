export function TickerLongName(value: string) {
  const tickerLongName = value.split(' ')
  return `${tickerLongName[0]} ${tickerLongName[1]}`
}
