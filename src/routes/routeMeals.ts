import { FastifyInstance } from 'fastify'
import {
  createMeals,
  getAllMeals,
  updateMeals,
} from '../Controllers/controllersMeals'

export async function routeMeals(app: FastifyInstance) {
  app.post('/', createMeals)
  app.put('/:mealId', updateMeals)
  app.get('/', getAllMeals)
}
