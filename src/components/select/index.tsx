import { Typography } from '@/components/typography'
import type { PressableProps } from 'react-native'
import { Container, Status } from './styles'

export type SelectStyle = {
  isSelected?: boolean
  bg: 'green' | 'red'
}

type SelectProps = PressableProps &
  SelectStyle & {
    title: string
  }

export function Select({ ...props }: SelectProps) {
  return (
    <Container {...props}>
      <Status bg={props.bg} isSelected={props.isSelected} />
      <Typography fontSize="title_xs" family="bold">
        {props.title}
      </Typography>
    </Container>
  )
}
