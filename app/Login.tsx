import { BLACK_COLOR } from '@/utils/colors'
import { router } from 'expo-router'
import React from 'react'
import styled from 'styled-components/native'

const Container = styled.View`
  background-color: ${BLACK_COLOR};
  flex: 1;
  color: white;
`

const Wrapper = styled.View`
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const Text = styled.Text`
  font-size: 16px;
  text-align: center;
  color: white;
`
const Btn = styled.Pressable``
const BtnTxt = styled.Text`
  font-size: 16px;
  color: white;
`
const Login = () => {
  return (
    <Container>
      <Text>
        Don't have an account?{' '}
        <Btn onPress={() => router.push('./Join')}>
          <BtnTxt>Join</BtnTxt>
        </Btn>
      </Text>
    </Container>
  )
}

export default Login
