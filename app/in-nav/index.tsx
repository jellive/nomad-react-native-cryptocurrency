import { coins } from '@/apis'
import { BLACK_COLOR } from '@/utils/colors'
import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator } from 'react-native'
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

const Home = () => {
  const { isLoading, data } = useQuery('coins', coins)
  const [cleanData, setCleanData] = useState([])
  useEffect(() => {
    setCleanData(
      data.filter(coin => coin.rank != 0 && coin.is_active && !coin.is_new)
    )
  }, [data])

  console.log(data.length, cleanData.length)
  if (isLoading) {
    return (
      <Loader>
        <ActivityIndicator color={'white'} />
      </Loader>
    )
  }
  return (
    <Container>
      <Text>Logged in</Text>
    </Container>
  )
}

export default Home
