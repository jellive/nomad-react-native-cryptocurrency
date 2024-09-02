import React, { useEffect, useRef } from 'react'
import { Animated, View } from 'react-native'
import styled from 'styled-components/native'

const Wrapper = styled(Animated.createAnimatedComponent(View))`
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.1);
  height: 54px;
`
const CoinName = styled.Text`
  color: white;
`
const CoinSymbol = styled.Text`
  color: white;
  font-weight: 500;
`

const Icon = styled.Image`
  border-radius: 20px;
  width: 40px;
  height: 40px;
  margin-bottom: 10px;
`

const Coin = ({ symbol, index }: { symbol: string; index: number }) => {
  const opacity = useRef(new Animated.Value(0)).current
  useEffect(() => {
    Animated.spring(opacity, {
      toValue: 1,
      useNativeDriver: true,
      delay: index * 200
    }).start()
  }, [])
  return (
    <Wrapper style={{ flex: 0.31, opacity }}>
      <Icon
        source={{
          uri: `https://cryptoicon-api.pages.dev/api/icon/${symbol.toLowerCase()}`
        }}
      />
      <CoinSymbol>{symbol}</CoinSymbol>
    </Wrapper>
  )
}

export default Coin
