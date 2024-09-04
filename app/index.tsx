import React, { useCallback, useContext, useEffect } from 'react'
import { Text } from 'react-native'
import { SigninContext } from './_layout'
import { router, Stack } from 'expo-router'
import OutNav from './out-nav/index'
import InNav from './in-nav/index'

const Index = () => {
  const isSignin = useContext(SigninContext)
  console.log('isSignin', isSignin)
  //   useCallback(() => {
  //     router.replace(isSignin ? '/in-nav' : '/out-nav')
  //   }, [isSignin])
  return isSignin ? <InNav /> : <OutNav />
  //   <Stack.Screen name="in-nav" />

  //   <Stack.Screen name="out-nav" />
}
export default Index
