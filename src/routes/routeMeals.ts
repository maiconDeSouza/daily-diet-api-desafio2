import { FastifyInstance } from 'fastify'
import {
  createMeals,
  deletarMeals,
  getAllMeals,
  getMetrics,
  getUniqueMeals,
  updateMeals,
} from '../Controllers/controllersMeals'

export async function routeMeals(app: FastifyInstance) {
  app.post('/', createMeals)
  app.put('/:mealId', updateMeals)
  app.get('/', getAllMeals)
  app.get('/:mealId', getUniqueMeals)
  app.delete('/:mealId', deletarMeals)
  app.get('/metrics', getMetrics)
}
