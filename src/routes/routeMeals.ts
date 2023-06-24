import { FastifyInstance } from 'fastify'
import { createMeals, updateMeals } from '../Controllers/controllersMeals'

export async function routeMeals(app: FastifyInstance) {
  app.post('/', createMeals)
  app.put('/:mealId', updateMeals)
}
