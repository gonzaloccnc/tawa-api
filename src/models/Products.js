import { DataTypes } from 'sequelize'
import { tawaDb } from '../db/index.js'

export const Products = tawaDb.define('products', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'this column does not accept empty values'
      },
      len: {
        args: [5, Infinity],
        msg: 'this columns should have minimum 5 characters'
      }
    }
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    validate: {
      isDecimal: true,
      min: 0.0
    }
  },
  stock: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    validate: {
      min: 0
    }
  }
})
