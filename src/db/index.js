import { Sequelize } from 'sequelize'
import 'dotenv/config'

const user = process.env.DB_USER
const psw = process.env.DB_PASSWORD
const host = process.env.DB_HOST ?? 'localhost'

export const tawaDb = new Sequelize(
  'tawa_db',
  user,
  psw,
  {
    host,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
)
