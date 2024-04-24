import { app } from './app.js'
import { tawaDb } from './db/index.js'
import './models/Products.js'

const PORT = process.env.PORT ?? 8080
const main = async () => {
  try {
    await tawaDb.authenticate()
    await tawaDb.sync()
    console.info('Connection has been established successfully.')
    app.listen(PORT, () => { console.info(`Server listen on port: ${PORT}`) })
  } catch (ex) {
    console.error(ex.message)
  }
}

main()
