import { FastifyInstance } from 'fastify'
import { createUser, loginUser } from '../Controllers/controllersUsers'

export async function routeUsers(app: FastifyInstance) {
  app.post('/', createUser)
  app.post('/login', loginUser)
}
