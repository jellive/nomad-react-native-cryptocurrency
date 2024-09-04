import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { router, Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback, useEffect, useState } from 'react'
import 'react-native-reanimated'
import auth from '@react-native-firebase/auth'

import { useColorScheme } from '@/hooks/useColorScheme'
import { BLACK_COLOR } from '@/utils/colors'
import InNav from '../in-nav/_layout'
import { QueryClient, QueryClientProvider } from 'react-query'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function OutNav() {
  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        presentation: 'modal',
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: BLACK_COLOR
        }
      }}
    />
  )
}
