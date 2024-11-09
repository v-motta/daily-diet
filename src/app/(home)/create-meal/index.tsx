import { useState } from 'react'
import { Alert } from 'react-native'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Layout } from '@/components/layout'
import { Select } from '@/components/select'
import { Typography } from '@/components/typography'

import { uuid } from '@/utils/uuid'

import type { MealDTO } from '@/dtos/meal'
import { createMeal } from '@/storage/meal/create-meal'
import { router } from 'expo-router'
import { Container, Form, Row } from './style'

export default function Page() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [hour, setHour] = useState('')
  const [isOnTheDiet, setIsOnTheDiet] = useState(true)

  function handleBackToHome() {
    router.navigate('/')
  }

  const alertError = (message: string) => Alert.alert('Nova refeição', message)

  async function handleSubmit() {
    try {
      const data: MealDTO = {
        id: uuid(),
        name: name.trim(),
        description: description.trim(),
        date,
        hour,
        isOnTheDiet,
      }

      if (name.trim().length === 0) {
        return alertError('Informe o nome da refeição.')
      }

      if (description.trim().length === 0) {
        return alertError('Informe a descrição da refeição.')
      }

      if (date.trim().length === 0) {
        return alertError('Informe a data da refeição.')
      }

      if (date.length < 10) {
        return alertError('O formato da data não é válida.')
      }

      if (hour.trim().length === 0) {
        return alertError('Informe a hora da refeição.')
      }

      if (hour.length < 5) {
        return alertError('O formato da hora não é válido.')
      }

      await createMeal(data)

      router.navigate(`feedback/${isOnTheDiet}`)
    } catch (error) {
      alertError('Não foi possível cadastrar nova refeição')
      console.log(error)
    }
  }

  return (
    <Container>
      <Layout title="Nova refeição" bg="gray" onPressBack={handleBackToHome}>
        <Form>
          <Row>
            <Input
              placeholder="Nome da refeição"
              label="Nome"
              value={name}
              onChangeText={(text: string) => setName(text)}
            />
          </Row>

          <Row>
            <Input
              placeholder="Descrição da refeição"
              label="Descrição"
              value={description}
              onChangeText={(text: string) => setDescription(text)}
            />
          </Row>

          <Row>
            <Input
              label="Data"
              mask="date"
              placeholder="dd/mm/aaaa"
              keyboardType="numeric"
              value={date}
              onInputMaksChange={(text: string) => setDate(text)}
              style={{ width: '99%', marginRight: 4 }}
            />

            <Input
              label="Hora"
              mask="hour"
              placeholder="HH:mm"
              keyboardType="numeric"
              value={hour}
              onInputMaksChange={(text: string) => setHour(text)}
              style={{ width: '99%', marginLeft: 4 }}
            />
          </Row>

          <Row>
            <Typography fontSize="title_xs" family="bold">
              Está na dieta?
            </Typography>
          </Row>

          <Row style={{ marginTop: -4 }}>
            <Select
              title="Sim"
              bg="green"
              isSelected={isOnTheDiet}
              onPress={() => setIsOnTheDiet(true)}
              style={{ width: '48%' }}
            />
            <Select
              title="Não"
              bg="red"
              isSelected={!isOnTheDiet}
              onPress={() => setIsOnTheDiet(false)}
              style={{ width: '48%' }}
            />
          </Row>
        </Form>

        <Button
          title="Cadastrar refeição"
          activeOpacity={0.5}
          onPress={handleSubmit}
        />
      </Layout>
    </Container>
  )
}
