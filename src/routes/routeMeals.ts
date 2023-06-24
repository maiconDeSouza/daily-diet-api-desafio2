import { FastifyInstance } from 'fastify'
import { createMeals } from '../Controllers/controllersMeals'

export async function routeMeals(app: FastifyInstance) {
  app.post('/', createMeals)
}
