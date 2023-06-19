import { app } from './app'

app.get('/', () => {
  return `ok`
})

app
  .listen({
    port: 2005,
  })
  .then(() => {
    console.log(`The server is running!`)
  })
