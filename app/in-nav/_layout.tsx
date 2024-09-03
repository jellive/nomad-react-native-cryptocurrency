import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Home from '.'
import Detail from './detail'
import { Stack } from 'expo-router'
import { signOut } from '@react-native-firebase/auth'
import { Button } from 'react-native'
import auth from '@react-native-firebase/auth'

export const unstable_settings = {
  initialRouteName: 'index'
}

const InNav = () => {
  const signOut = () => {
    auth().signOut()
  }
  return (
    <Stack
      screenOptions={{
        headerRight: () => <Button onPress={() => signOut()} title="Signout" />
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="detail" />
    </Stack>
  )
}

export default InNav
