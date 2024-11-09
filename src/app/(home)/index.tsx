import { Button } from '@/components/button'
import { Card } from '@/components/card'
import { Meal } from '@/components/meal'
import { Typography } from '@/components/typography'
import type { MealDTO } from '@/dtos/meal'
import { getAllMeals } from '@/storage/meal/get-all-meals'
import { mealsList } from '@/utils/lists'
import { statsSorter } from '@/utils/statistics'
import { router, useFocusEffect } from 'expo-router'
import { Plus } from 'lucide-react-native'
import { useCallback, useState } from 'react'
import { SectionList, View } from 'react-native'
import { Header } from './header'
import { Container } from './style'

type Meals = {
  date: string
  data: MealDTO[]
}

type Statistic = {
  percentage: string
  isMealsOnTheDiet: boolean
}

export default function Page() {
  const [meals, setMeals] = useState<Meals[]>([])
  const [statistic, setStatistic] = useState<Statistic>()

  function handleGoStatistic() {
    router.navigate('/statistic')
  }

  function handleGoRegisterNewMeal() {
    router.navigate('/create-meal')
  }

  function handleGoMeal(id: string) {
    router.navigate(`/meal/${id}`)
  }

  async function fetchMeals() {
    try {
      const data = await getAllMeals()

      const meals = mealsList(data)

      const { percentage, mealsOnTheDiet, mealsOutOnDiet } = statsSorter(data)

      const isMealsOnTheDiet = mealsOnTheDiet >= mealsOutOnDiet

      const statistics = {
        percentage,
        isMealsOnTheDiet,
      }

      setStatistic(statistics)

      setMeals(meals)
    } catch (error) {
      console.log(error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchMeals()
    }, []),
  )

  return (
    <Container>
      <Header />

      {statistic && (
        <Card
          title={statistic.percentage}
          subtitle={`das refeições ${
            statistic.isMealsOnTheDiet ? 'dentro' : 'fora'
          } da dieta`}
          bg={statistic.isMealsOnTheDiet ? 'green' : 'red'}
          onPress={handleGoStatistic}
        />
      )}

      <View style={{ marginTop: 40 }}>
        <Typography fontSize="title_sm" style={{ marginBottom: 8 }}>
          Refeições
        </Typography>
        <Button
          title="Nova refeição"
          icon={<Plus color="white" size={18} />}
          activeOpacity={0.5}
          onPress={handleGoRegisterNewMeal}
        />
      </View>

      <SectionList
        sections={meals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Meal key={item.id} onPress={() => handleGoMeal(item.id)} {...item} />
        )}
        renderSectionHeader={({ section: { date } }) => (
          <Typography
            fontSize="title_sm"
            family="bold"
            color="gray_1"
            style={{ marginBottom: 8, marginTop: 32 }}
          >
            {date}
          </Typography>
        )}
        style={{ marginVertical: 32 }}
        contentContainerStyle={
          meals.length === 0 && {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }
        }
        ListEmptyComponent={() => (
          <>
            <Typography>Não há refeições cadastradas ainda.</Typography>
            <Typography>Vamos cadastrar refeições hoje?</Typography>
          </>
        )}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  )
}
