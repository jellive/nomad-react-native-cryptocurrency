import React, { useCallback, useContext, useEffect } from 'react'
import { Text } from 'react-native'
import { SigninContext } from './_layout'
import { router, Stack } from 'expo-router'
import OutNav from './out-nav/index'
import InNav from './in-nav/index'

const Index = () => {
  //   useEffect(() => {
  //     setTimeout(() => router.replace(isSignin ? '/in-nav' : '/out-nav'), 1)
  //   }, [isSignin])
  //   return isSignin ? <InNav /> : <OutNav />
  return <></>
}
export default Index
