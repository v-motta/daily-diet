import logo from '@/assets/logo.png'
import { Image, Text, View } from 'react-native'
import { style } from './style'

export function Header() {
  return (
    <View style={style.container}>
      <Image source={logo} />

      <View style={style.avatar}>
        <Text>VM</Text>
      </View>
    </View>
  )
}
