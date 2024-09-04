import { info, history } from '@/apis'
import { Icon } from '@/components/Coin'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from 'expo-router'
import React, { useEffect } from 'react'
import { useQuery } from 'react-query'

import styled from 'styled-components/native'

const Wrapper = styled.View``
const Text = styled.Text``

const detail = () => {
  const { params }: { params: { symbol: string; id: string } } = useRoute()
  const navigation = useNavigation()
  console.log(params)

  useEffect(() => {
    navigation.setOptions({
      // title: params?.symbol,
      headerLargeTitle: true,

      headerTitle: () => (
        <Icon
          source={{
            uri: `https://cryptoicon-api.pages.dev/api/icon/${params?.symbol.toLowerCase()}`
          }}
        />
      )
    })
  }, [])
  const { isLoading: infoLoading, data: infoData } = useQuery(
    ['coinInfo', params.id],
    info
  )

  const { isLoading: historyLoading, data: historyData } = useQuery(
    ['coinHistory', params.id],
    history
  )

  console.log('info', infoData)
  console.log('history', historyData)
  return (
    <Wrapper>
      <Text>Detail</Text>
    </Wrapper>
  )
}
export default detail
