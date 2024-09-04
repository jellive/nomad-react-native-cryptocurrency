import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Home from '.'
import Detail from './detail'
import { Stack } from 'expo-router'
import { signOut } from '@react-native-firebase/auth'
import { Button } from 'react-native'
import auth from '@react-native-firebase/auth'
import { BLACK_COLOR } from '@/utils/colors'

export const unstable_settings = {
  initialRouteName: 'index'
}

const InNav = () => {
  const signOut = () => {
    auth().signOut()
  }
  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        presentation: 'modal',
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: BLACK_COLOR
        },
        headerRight: () => <Button onPress={() => signOut()} title="Signout" />
      }}
    >
      <Stack.Screen name="index" options={{ headerTitle: 'Coin' }} />
      <Stack.Screen name="detail" />
    </Stack>
  )
}

export default InNav
