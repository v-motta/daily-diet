import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import type { StatisticBackground } from '.'

export const Container = styled(SafeAreaView)<StatisticBackground>`
	flex: 1;
	background-color: ${({ theme, bg }) =>
    bg === 'green'
      ? theme.colors.brand.green_light
      : theme.colors.brand.red_light};
`

export const Row = styled.View`
	width: 100%;

	flex-direction: row;
	align-items: center;
	justify-content: space-between;

	margin: 6px;
`
