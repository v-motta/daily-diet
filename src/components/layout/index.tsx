import { Typography } from '@/components/typography'
import theme from '@/theme'
import { ArrowLeft } from 'lucide-react-native'
import { Back, Container, Content, Header } from './styles'

export type LayoutColor = { bg?: 'gray' | 'green' | 'red' }

type LayoutProps = LayoutColor & {
  title: string | JSX.Element
  children: React.ReactNode
  onPressBack?: () => void
}

export function Layout({ bg = 'gray', ...props }: LayoutProps) {
  return (
    <Container bg={bg}>
      <Header>
        {typeof props.title === 'string' ? (
          <>
            <Back style={{ width: '15%' }} onPress={props.onPressBack}>
              <ArrowLeft color={theme.colors.base.gray_1} />
            </Back>

            <Typography
              fontSize="title_sm"
              family="bold"
              lineHeight="lg"
              style={{ width: '60%', textAlign: 'center' }}
            >
              {props.title}
            </Typography>

            <Typography style={{ width: '15%' }} />
          </>
        ) : (
          <>{props.title}</>
        )}
      </Header>

      <Content>{props.children}</Content>
    </Container>
  )
}
