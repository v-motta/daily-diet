import { useCallback, useState } from 'react'
import { Alert } from 'react-native'

import { Button } from '@/components/button'
import { Layout } from '@/components/layout'
import { Modal } from '@/components/modal'
import { Typography } from '@/components/typography'

import type { MealDTO } from '@/dtos/meal'

import { getAllMeals } from '@/storage/meal/get-all-meals'
import { removeMeal } from '@/storage/meal/remove-meal'
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router'
import { Edit3, Trash2 } from 'lucide-react-native'
import { Container, Content, Row, Status, Tag } from './styles'

type RouteParams = { id: string }

export type MealStatus = { isOnTheDiet: boolean }
export type MealBackground = { bg: 'green' | 'red' }

export default function Page() {
  const [meal, setMeal] = useState<MealDTO>()
  const [modalVisible, setModalVisible] = useState(false)

  const { id } = useLocalSearchParams()

  function handleBackToHome() {
    router.navigate('/')
  }

  function handleGoUpdateMeal(id: string) {
    router.navigate(`/edit-meal/${id}`)
  }

  const alertError = (message: string) => Alert.alert('Refeição', message)

  async function fetchMeal() {
    try {
      const data = await getAllMeals()

      const meal = data.filter((meal: MealDTO) => meal.id === id)[0]

      setMeal(meal)
    } catch (error) {
      alertError('Não foi possível visualizar a refeição')
      console.log(error)
    }
  }

  async function handleMealRemove(id: string) {
    try {
      // Remove a refeição
      await removeMeal(id)

      // Volta para a página home
      handleBackToHome()
    } catch (error) {
      console.log(error)
    }
  }

  // when it has focus on the screen
  useFocusEffect(
    // executes the fetchMeal function
    useCallback(() => {
      fetchMeal()
    }, []),
  )

  return (
    <Container bg={meal?.isOnTheDiet ? 'green' : 'red'}>
      <Layout
        title="Refeição"
        bg={meal?.isOnTheDiet ? 'green' : 'red'}
        onPressBack={handleBackToHome}
      >
        <Content>
          <Row>
            <Typography
              fontSize="title_md"
              family="bold"
              lineHeight="lg"
              style={{ marginBottom: 8 }}
            >
              {meal?.name}
            </Typography>
            <Typography>{meal?.description}</Typography>
          </Row>
          <Row>
            <Typography
              fontSize="title_xs"
              family="bold"
              style={{ marginBottom: 8 }}
            >
              Data e hora
            </Typography>
            <Typography>
              {meal?.date} às {meal?.hour}
            </Typography>
          </Row>
          <Row>
            {meal?.isOnTheDiet ? (
              <Tag>
                <Status isOnTheDiet={meal?.isOnTheDiet} />
                <Typography fontSize="body_sm" lineHeight="sm">
                  dentro da dieta
                </Typography>
              </Tag>
            ) : (
              <Tag>
                <Status isOnTheDiet={!meal?.isOnTheDiet} />
                <Typography fontSize="body_sm" lineHeight="sm">
                  fora da dieta
                </Typography>
              </Tag>
            )}
          </Row>
        </Content>

        {meal && modalVisible && (
          <Modal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            onAction={() => handleMealRemove(meal.id)}
          />
        )}

        <Button
          type="solid"
          title="Editar refeição"
          icon={<Edit3 color="white" />}
          onPress={() => handleGoUpdateMeal(meal!.id)}
          style={{ marginBottom: 8 }}
        />

        <Button
          type="outline"
          title="Excluir refeição"
          icon={<Trash2 color="black" />}
          onPress={() => setModalVisible(true)}
        />
      </Layout>
    </Container>
  )
}
