import type { MealDTO } from '@/dtos/meal'
import { MEALS_COLLECTION } from '@/storage/storage.config'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getAllMeals } from './get-all-meals'

export async function removeMeal(id: string) {
  const storage = await getAllMeals()

  const mealsFilterd = storage.filter((meal: MealDTO) => meal.id !== id)

  const meals = JSON.stringify(mealsFilterd)

  await AsyncStorage.setItem(MEALS_COLLECTION, meals)
}
