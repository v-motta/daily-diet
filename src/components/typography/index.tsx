import type { TextProps } from 'react-native'

import type * as StylesDTO from '@/dtos/style'

import { Container } from './styles'

export type TypographyStyle = {
  fontSize?: StylesDTO.FontSize
  family?: StylesDTO.Family
  lineHeight?: StylesDTO.LineHeight
  color?: StylesDTO.Color
  textAlign?: StylesDTO.TextAlign
}

type TypographyProps = TextProps & TypographyStyle & {}

export function Typography({ ...props }: TypographyProps) {
  return <Container {...props}>{props.children}</Container>
}
