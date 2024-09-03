import { BLACK_COLOR } from '@/utils/colors'
import { router } from 'expo-router'
import React, { useRef, useState } from 'react'
import { TextInput, Alert, ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'
import auth from '@react-native-firebase/auth'

const Container = styled.View`
  background-color: ${BLACK_COLOR};
  flex: 1;
  align-items: center;
  color: white;
  padding: 60px 20px;
`
const JoinInput = styled.TextInput`
  width: 100%;
  padding: 10px 20px;
  border-radius: 20px;
  margin-bottom: 10px;
  font-size: 16px;
  color: white;
  background-color: rgba(255, 255, 255, 0.5);
`
const Btn = styled.Pressable`
  width: 100%;
  padding: 10px 20px;
  border-width: 1px;
  border-radius: 20px;
  border-color: rgba(255, 255, 255, 0.5);
  justify-content: center;
  align-items: center;
`
const BtnTxt = styled.Text`
  color: white;
  font-size: 16px;
`
const Login = () => {
  const passwordInput = useRef<TextInput>()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const onSubmitEmailEditing = () => {
    passwordInput.current?.focus()
  }

  const onSubmitPasswordEditing = async () => {
    if (email === '' || password === '') Alert.alert('Fill in the form.')
    if (loading) return
    setLoading(true)
    const userCredential = await auth()
      .signInWithEmailAndPassword(email, password)
      .catch(err => {
        console.error(err)
        switch (err.code) {
          case 'auth/weak-password': {
            Alert.alert('Write a stronger password!')
          }
        }
      })
    console.log('user', userCredential)
  }

  return (
    <Container>
      <JoinInput
        placeholder="Email"
        keyboardType="email-address"
        autoCorrect={false}
        returnKeyType="next"
        value={email}
        onChangeText={text => setEmail(text)}
        onSubmitEditing={onSubmitEmailEditing}
      />
      <JoinInput
        ref={passwordInput}
        placeholder="Password"
        secureTextEntry
        value={password}
        returnKeyType="done"
        onChangeText={text => setPassword(text)}
        onSubmitEditing={onSubmitPasswordEditing}
      />
      <Btn onPress={onSubmitPasswordEditing}>
        {loading ? (
          <ActivityIndicator color={'white'} />
        ) : (
          <BtnTxt>
            Don't have an account?{' '}
            <Btn onPress={() => router.push('./Join')}>
              <BtnTxt>Join</BtnTxt>
            </Btn>
          </BtnTxt>
        )}
      </Btn>
    </Container>
  )
  return <Container></Container>
}

export default Login
