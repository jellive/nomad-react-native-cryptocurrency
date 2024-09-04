import React, { useCallback, useContext, useEffect } from 'react'
import { Text } from 'react-native'
import { SigninContext } from './_layout'
import { router, Stack } from 'expo-router'
import OutNav from './out-nav/index'
import InNav from './in-nav/index'

const Index = () => {
  const isSignin = useContext(SigninContext)
  console.log('isSignin', isSignin)

  //   useEffect(() => {
  //     setTimeout(() => router.replace(isSignin ? '/in-nav' : '/out-nav'), 1)
  //   }, [isSignin])
  //   return isSignin ? <InNav /> : <OutNav />
  return <></>
  //   <Stack.Screen name="in-nav" />

  //   <Stack.Screen name="out-nav" />
}
export default Index
