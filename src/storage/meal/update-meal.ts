import type { MealDTO } from '@/dtos/meal'
import { createMeal } from './create-meal'
import { removeMeal } from './remove-meal'

export async function updateMeal(id: string, meal: MealDTO) {
  await removeMeal(id)

  await createMeal(meal)
}
