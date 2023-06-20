import { app } from './app'
import { routeUsers } from './routes/routeUsers'

app.register(routeUsers, {
  prefix: 'users',
})

app
  .listen({
    port: 2005,
  })
  .then(() => {
    console.log(`The server is running!`)
  })
