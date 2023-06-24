import fastifyJwt from '@fastify/jwt'
import { app } from './app'
import { routeUsers } from './routes/routeUsers'
import { z } from 'zod'
import dotenv from 'dotenv'
import { routeMeals } from './routes/routeMeals'
dotenv.config()

const envSchema = z.string()

app.register(fastifyJwt, {
  secret: envSchema.parse(process.env.SECRET),
})

app.register(routeUsers, {
  prefix: 'users',
})

app.register(routeMeals, {
  prefix: 'meals',
})

app
  .listen({
    port: 2005,
  })
  .then(() => {
    console.log(`The server is running!`)
  })
