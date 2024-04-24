import morgan from 'morgan'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { productsRouter } from './controllers/productsController.js'

const app = express()
const ENV = process.env.NODE_ENV ?? 'DEVELOPMENT'
const morganFormat = ENV === 'DEVELOPMENT' ? 'dev' : 'combined'

app
  .use(express.json())
  .use(cors())
  .use(morgan(morganFormat))
  .use('/api', productsRouter)

export { app }
