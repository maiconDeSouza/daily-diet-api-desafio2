import { FastifyInstance } from 'fastify'
import { createUser } from '../Controllers/controllersUsers'

export async function routeUsers(app: FastifyInstance) {
  app.post('/', createUser)
}
