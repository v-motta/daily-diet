import theme from '@/theme'
import {
  NunitoSans_400Regular,
  NunitoSans_700Bold,
  useFonts,
} from '@expo-google-fonts/nunito-sans'
import { Slot } from 'expo-router'
import { ActivityIndicator, StatusBar } from 'react-native'
import { ThemeProvider } from 'styled-components'

export default function HomeLayout() {
  const [fontsLoaded] = useFonts({ NunitoSans_400Regular, NunitoSans_700Bold })

  return (
    <ThemeProvider theme={theme}>
      <>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        {fontsLoaded ? <Slot /> : <ActivityIndicator />}
      </>
    </ThemeProvider>
  )
}
