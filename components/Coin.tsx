import Detail from '@/app/in-nav/detail'
import { useNavigation } from '@react-navigation/native'
import { router } from 'expo-router'
import React, { useEffect, useRef } from 'react'
import { Animated, TouchableOpacity, View } from 'react-native'
import styled from 'styled-components/native'

const Wrapper = styled(Animated.createAnimatedComponent(View))`
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 10px;
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
  const navigation = useNavigation() // react-navigation안에 있으므로.
  const opacity = useRef(new Animated.Value(0)).current
  useEffect(() => {
    Animated.spring(opacity, {
      toValue: 1,
      useNativeDriver: true,
      delay: index * 100
    }).start()
  }, [])
  const scale = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 1]
  })
  return (
    <TouchableOpacity
      style={{ flex: 0.31 }}
      onPress={() =>
        router.push({ pathname: '/in-nav/detail', params: { symbol } })
      }
    >
      <Wrapper style={{ opacity, transform: [{ scale }] }}>
        <Icon
          source={{
            uri: `https://cryptoicon-api.pages.dev/api/icon/${symbol.toLowerCase()}`
          }}
        />
        <CoinSymbol>{symbol}</CoinSymbol>
      </Wrapper>
    </TouchableOpacity>
  )
}

export default Coin
