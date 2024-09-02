import { router } from 'expo-router'
import React from 'react'
import { Pressable } from 'react-native'
import styled from 'styled-components/native'

const Container = styled.View``
const Text = styled.Text``
const View = styled.View``
const Home = () => {
  return (
    <Container>
      <View>
        <Pressable onPress={() => router.push('./Join')}>
          <Text>Home</Text>
        </Pressable>
        <Pressable onPress={() => router.push('./Login')}>
          <Text>Login</Text>
        </Pressable>
      </View>
    </Container>
  )
}

export default Home
