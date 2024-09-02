import React, { useRef } from 'react'
import { Animated } from 'react-native'
import styled from 'styled-components/native'

const Wrapper = styled.View`
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

const Coin = ({ symbol }: { symbol: string }) => {
  const opacity = useRef(new Animated.Value(0)).current
  return (
    <Wrapper style={{ flex: 0.31 }}>
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
