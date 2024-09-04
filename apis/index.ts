const BASE_URL = 'https://api.coinpaprika.com/v1'
const COINS_URL = `${BASE_URL}/coins`

export const coins = () => fetch(COINS_URL).then(response => response.json())

export const info = ({ queryKey }) => {
  const [_, coinId] = queryKey
  return fetch(`${COINS_URL}/${coinId}`).then(response => response.json())
}
export const history = ({ queryKey }) => {
  const [_, coinId] = queryKey
  console.log('date', new Date().toISOString().split('T')[0])
  return fetch(
    `${BASE_URL}/tickers/${coinId}/historical?start=${
      new Date().toISOString().split('T')[0]
    }&interval=1h`
  ).then(response => response.json())
}
