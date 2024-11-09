import type { MealDTO } from '@/dtos/meal'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MEALS_COLLECTION } from '../storage.config'

export async function getAllMeals(): Promise<MealDTO[]> {
  const storage = await AsyncStorage.getItem(MEALS_COLLECTION)

  const meals = storage ? JSON.parse(storage) : []

  return meals
}
