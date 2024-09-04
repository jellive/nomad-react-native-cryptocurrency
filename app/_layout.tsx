import '../components/wdyr'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { router, Slot, usePathname, useRootNavigationState } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { createContext, useEffect, useRef, useState } from 'react'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'

import { useColorScheme } from '@/hooks/useColorScheme'

import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

export const SignInContext = createContext(false)

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

const RootLayout = () => {
  const colorScheme = useColorScheme()
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const path = usePathname()
  const [isSignIn, setIsSignIn] = useState(false)
  const [passed, setPassed] = useState(false)
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)
  const rootIsReady = useRootNavigationState()

  useEffect(() => {
    console.log('once')
    auth().onAuthStateChanged(user => {
      setUser(user)
      console.log('authChanged', user)
      if (user) {
        setIsSignIn(true)
      } else {
        setIsSignIn(false)
      }
    })
  }, [])
  console.log(rootIsReady?.routes)

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
  })

  useEffect(() => {
    console.log('loaded')
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  useEffect(() => {
    console.log('rootIsReady')
    if (!rootIsReady?.key || passed || path !== '/') return

    console.log('rootIsReady', rootIsReady?.key)

    // console.log('rootIsReady: isloggedIn', isLoggedIn)
    // if (rootIsReady?.routeNames?.includes('_sitemap'))
    setPassed(true)

    // return () => router.replace(user ? '/in-nav' : '/out-nav')
  }, [rootIsReady?.key])

  useEffect(() => {
    console.log('user')
    if (!passed) return
    if (path !== '/') {
      router.replace(user ? '/in-nav' : '/out-nav')
    }
  }, [user])

  useEffect(() => {
    console.log(passed)
  }, [passed])

  if (!loaded) {
    return null
  }
  console.log(colorScheme, 'hihi!')

  return (
    <SignInContext.Provider value={isSignIn}>
      {/* // <GestureHandlerRootView style={{ flex: 1 }}> */}
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <Slot />
          {/* {isLoggedIn ? <InNav /> : <OutNav />} */}
          {/* <Redirect href={isLoggedIn ? '/in-nav' : '/out-nav'} /> */}
        </ThemeProvider>
      </QueryClientProvider>
      {/* // </GestureHandlerRootView> */}
    </SignInContext.Provider>
  )
}

RootLayout.whyDidYouRender = false

export default RootLayout
