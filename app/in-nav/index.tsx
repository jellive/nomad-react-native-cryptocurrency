import { coins } from '@/apis'
import Coin from '@/components/Coin'
import { BLACK_COLOR } from '@/utils/colors'
import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useQuery } from 'react-query'
import styled from 'styled-components/native'

const Container = styled.View`
  background-color: ${BLACK_COLOR};
  flex: 1;
  padding: 10px;
`

const List = styled.FlatList`
  padding: 20px 10px;
  width: 100%;
`

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const Home = () => {
  const { isLoading, data } = useQuery('coins', coins)
  const [cleanData, setCleanData] = useState([])
  useEffect(() => {
    if (data)
      setCleanData(
        data?.filter(coin => coin.rank != 0 && coin.is_active && !coin.is_new)
      )
  }, [data])

  if (isLoading) {
    return (
      <Loader>
        <ActivityIndicator color={'white'} />
      </Loader>
    )
  }
  return (
    <Container>
      <List
        data={cleanData}
        numColumns={3}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        columnWrapperStyle={{ justifyContent: 'space-between' }} // contentContainerStyle과는 다르게 한 열을 꾸밀 수 있음.
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <Coin symbol={item.symbol} index={index} />
        )}
      />
    </Container>
  )
}

export default Home
