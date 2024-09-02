import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { router, Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useState } from 'react'
import 'react-native-reanimated'
import auth from '@react-native-firebase/auth'

import { useColorScheme } from '@/hooks/useColorScheme'
import { BLACK_COLOR } from '@/utils/colors'
import InNav from './in-nav/_layout'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    })
  }, [])

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {isLoggedIn ? (
          <InNav />
        ) : (
          <Stack
            screenOptions={{
              presentation: 'modal',
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: BLACK_COLOR
              }
            }}
          >
            <Stack.Screen name="Login" />
            <Stack.Screen name="index" />
            <Stack.Screen name="Join" />
            <Stack.Screen name="+not-found" />
          </Stack>
        )}
      </ThemeProvider>
    </QueryClientProvider>
  )
}
