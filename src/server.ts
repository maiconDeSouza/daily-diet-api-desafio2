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

const envPortSchema = z.string()
const port = Number(envPortSchema.parse(process.env.PORT)) || 3000

app
  .listen({
    port,
  })
  .then(() => {
    console.log(`The server is running!`)
  })
