import { FastifyInstance } from 'fastify'
import {
  createMeals,
  getAllMeals,
  getUniqueMeals,
  updateMeals,
} from '../Controllers/controllersMeals'

export async function routeMeals(app: FastifyInstance) {
  app.post('/', createMeals)
  app.put('/:mealId', updateMeals)
  app.get('/', getAllMeals)
  app.get('/:mealId', getUniqueMeals)
}
