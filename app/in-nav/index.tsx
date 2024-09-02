import { coins } from '@/apis'
import { BLACK_COLOR } from '@/utils/colors'
import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useQuery } from 'react-query'
import styled from 'styled-components/native'

const Container = styled.View`
  background-color: ${BLACK_COLOR};
  flex: 1;
`

const Text = styled.Text``

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const Coin = styled.View`
  align-items: center;
`
const CoinName = styled.Text`
  color: white;
`
const CoinSymbol = styled.Text`
  color: white;
`

const Home = () => {
  const { isLoading, data } = useQuery('coins', coins)
  const [cleanData, setCleanData] = useState([])
  useEffect(() => {
    setCleanData(
      data?.filter(coin => coin.rank != 0 && coin.is_active && !coin.is_new)
    )
  }, [data])

  data.length && console.log(data.length, cleanData.length)
  if (isLoading) {
    return (
      <Loader>
        <ActivityIndicator color={'white'} />
      </Loader>
    )
  }
  return (
    <Container>
      <FlatList
        data={cleanData}
        numColumns={5}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Coin>
            <CoinName>{item.name}</CoinName>
            <CoinSymbol>{item.symbol}</CoinSymbol>
          </Coin>
        )}
      />
    </Container>
  )
}

export default Home
