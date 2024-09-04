import { Redirect, useRootNavigationState } from 'expo-router'
import React, { useContext } from 'react'
import { View } from 'react-native'
import { SignInContext } from './_layout'

const Index = () => {
  const rootNavigationState = useRootNavigationState() // 맨 초기 루트 뜨는 여부는 여기서 판별하면 됨.
  const isSignin = useContext(SignInContext)
  //   useEffect(() => {
  //     setTimeout(() => router.replace(isSignin ? '/in-nav' : '/out-nav'), 1)
  //   }, [isSignin])
  //   return isSignin ? <InNav /> : <OutNav />
  if (!rootNavigationState?.key) return null
  return <Redirect href={isSignin ? '/in-nav' : '/out-nav'} />
}
export default Index
