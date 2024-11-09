import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useState } from 'react'

import { Card } from '@/components/card'
import { Layout } from '@/components/layout'
import { Typography } from '@/components/typography'

import { statsSorter } from '@/utils/statistics'

import { getAllMeals } from '@/storage/meal/get-all-meals'
import { router } from 'expo-router'
import { Container, Row } from './styles'

type Statistic = {
  percentage: string
  bestSequenceOfDishesWithinTheDiet: string
  registeredMeals: string
  mealsOnTheDiet: string
  mealsOutOnDiet: string
}

export type StatisticBackground = {
  bg: 'green' | 'red'
}

export default function Page() {
  const [statistic, setStatistic] = useState<Statistic>()
  const [isMealsOnTheDiet, setIsMealsOnTheDiet] = useState(true)

  function handleBackToHome() {
    router.navigate('/')
  }

  async function handleReceiveMeal() {
    try {
      const data = await getAllMeals()

      const statistic = statsSorter(data)

      const isMealsOnTheDiet =
        statistic.mealsOnTheDiet >= statistic.mealsOutOnDiet

      setIsMealsOnTheDiet(isMealsOnTheDiet)

      setStatistic(statistic)
    } catch (error) {
      console.log(error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      handleReceiveMeal()
    }, []),
  )

  return (
    <Container bg={isMealsOnTheDiet ? 'green' : 'red'}>
      {statistic && (
        <Layout
          bg={isMealsOnTheDiet ? 'green' : 'red'}
          title={
            <Card
              title={statistic.percentage}
              subtitle={`das refeições ${
                isMealsOnTheDiet ? 'dentro' : 'fora'
              } da dieta`}
              bg={isMealsOnTheDiet ? 'green' : 'red'}
              iconPosition="left"
              onPress={handleBackToHome}
            />
          }
        >
          <Typography
            family="bold"
            fontSize="title_xs"
            style={{ marginBottom: 19 }}
          >
            Estatísticas gerais
          </Typography>

          <Row>
            <Card
              title={statistic.bestSequenceOfDishesWithinTheDiet}
              subtitle="melhor sequência de pratos dentro da dieta"
              bg="gray"
              showIconButton={false}
            />
          </Row>

          <Row>
            <Card
              title={statistic.registeredMeals}
              subtitle="refeições registradas"
              bg="gray"
              showIconButton={false}
            />
          </Row>

          <Row>
            <Card
              title={statistic.mealsOnTheDiet}
              subtitle="refeições dentro da dieta"
              bg="green"
              showIconButton={false}
              style={{ width: '48%' }}
            />

            <Card
              title={statistic.mealsOutOnDiet}
              subtitle="refeições fora da dieta"
              bg="red"
              showIconButton={false}
              style={{ width: '48%' }}
            />
          </Row>
        </Layout>
      )}
    </Container>
  )
}
