import type { MealDTO } from '@/dtos/meal'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MEALS_COLLECTION } from '../storage.config'
import { getAllMeals } from './get-all-meals'

export async function createMeal(meal: MealDTO) {
  const storedMeals = await getAllMeals()

  const updatedMeals = [...storedMeals, meal]

  const storage = JSON.stringify(updatedMeals)

  await AsyncStorage.setItem(MEALS_COLLECTION, storage)
}
