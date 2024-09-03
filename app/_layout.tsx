import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
  useNavigation
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { router, Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback, useEffect, useState } from 'react'
import 'react-native-reanimated'
import auth, { signOut } from '@react-native-firebase/auth'

import { useColorScheme } from '@/hooks/useColorScheme'
import { BLACK_COLOR } from '@/utils/colors'
import InNav from './in-nav/_layout'
import { QueryClient, QueryClientProvider } from 'react-query'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import OutNav from './out-nav/_layout'
import { Button, View } from 'react-native'

const queryClient = new QueryClient()

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigation = useNavigation()

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

  useEffect(() => {
    router.replace(isLoggedIn ? '/in-nav' : '/out-nav')
  }, [isLoggedIn])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <Stack
            screenOptions={{
              headerShown: false
            }}
          >
            <Stack.Screen name="in-nav" />
            <Stack.Screen name="out-nav" />
          </Stack>
          {/* {isLoggedIn ? <InNav /> : <OutNav />} */}
        </ThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  )
}
