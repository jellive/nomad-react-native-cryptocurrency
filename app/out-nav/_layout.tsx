import { BLACK_COLOR } from '@/utils/colors'
import { Stack } from 'expo-router'

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
