import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
  useNavigation
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import {
  Redirect,
  router,
  Slot,
  Stack,
  usePathname,
  useRootNavigationState,
  useSegments
} from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import 'react-native-reanimated'
import auth, { FirebaseAuthTypes, signOut } from '@react-native-firebase/auth'

import { useColorScheme } from '@/hooks/useColorScheme'
import { BLACK_COLOR } from '@/utils/colors'
import InNav from './in-nav/_layout'
import { QueryClient, QueryClientProvider } from 'react-query'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import OutNav from './out-nav/index'
import { Button, Platform, View } from 'react-native'

const queryClient = new QueryClient()

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const rootIsReady = useRootNavigationState()
  const path = usePathname()
  const [passed, setPassed] = useState(false)
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)
  useEffect(() => {
    console.log('path', path)
  }, [])

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      setUser(user)
      console.log('authChanged', user)
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

  useEffect(() => {
    if (!rootIsReady?.key || passed) return

    console.log('rootIsReady', rootIsReady?.key)

    console.log('rootIsReady: isloggedIn', isLoggedIn)
    // if (rootIsReady?.routeNames?.includes('_sitemap'))
    setPassed(true)
    router.replace(user ? '/in-nav' : '/out-nav')
    // setTimeout(() => router.replace(isLoggedIn ? '/in-nav' : '/out-nav'), 1500)
  }, [rootIsReady])

  useEffect(() => {
    if (!passed) return
    if (rootIsReady?.routeNames?.includes('+not-found'))
      router.replace(user ? '/in-nav' : '/out-nav')
  }, [user])

  if (!loaded) {
    return null
  }
  console.log('hi?', rootIsReady, 'hihi!')

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <Slot />
          {/* {isLoggedIn ? <InNav /> : <OutNav />} */}
          {/* <Redirect href={isLoggedIn ? '/in-nav' : '/out-nav'} /> */}
        </ThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  )
}
