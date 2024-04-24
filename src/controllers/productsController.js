import { Products } from '../models/Products.js'
import { Router } from 'express'
import { modelHandlingError } from '../utils/modelHandlingError.js'
import { convertValidObj } from '../utils/convertValidObj.js'
import { validateParamProductId } from '../middlewares/validateNumber.js'

const productsRouter = Router()

productsRouter.get('/products', async (req, res) => {
  const { limit = 15, page = 0 } = req.query

  if (isNaN(parseInt(limit)) || isNaN(parseInt(page))) {
    return res.status(400).json({
      status: 400,
      message: 'the query params should be numbers'
    })
  }

  try {
    const totalProducts = await Products.count()
    const totalPages = Math.ceil(totalProducts / limit)
    const products = await Products.findAll({ limit, offset: limit * page })

    return res.status(200).json({
      data: products,
      message: 'all products was listed',
      status: 200,
      hints: products.length,
      perPage: parseInt(limit),
      page: parseInt(page),
      totalPages,
      hasNextPage: parseInt(page) + 1 < totalPages
    })
  } catch (ex) {
    return res.status(500).json({
      status: 500,
      error: 'Internal server error',
      message: ex.message
    })
  }
})

productsRouter.get('/products/:idProduct', validateParamProductId, async (req, res) => {
  const { idProduct } = req.params
  const id = parseInt(idProduct)

  try {
    const productFound = await Products.findByPk(id)

    if (productFound == null) {
      return res.status(404).json({
        data: null,
        message: `product with id: ${id} not found`,
        status: 404
      })
    }

    return res.status(200).json({
      data: productFound,
      message: 'product found',
      status: 200
    })
  } catch (ex) {
    return res.status(500).json({
      status: 500,
      error: 'Internal server error',
      message: ex.message
    })
  }
})

productsRouter.post('/products', async (req, res) => {
  const { name, price, stock } = req.body

  if (!name || price == null || stock == null) {
    return res.status(400).json({
      data: null,
      status: 400,
      message: 'Bad request the body is required'
    })
  }

  try {
    const productSaved = await Products.create({ name, price, stock })

    return res.status(201).json({
      data: productSaved,
      status: 201,
      message: 'product created successful'
    })
  } catch (ex) {
    const errorResponse = modelHandlingError(ex)
    return res
      .status(errorResponse.status)
      .json(errorResponse)
  }
})

productsRouter.patch('/products/:idProduct', validateParamProductId, async (req, res) => {
  const { idProduct } = req.params
  const id = parseInt(idProduct)

  const { price, stock, name } = req.body
  const valuesToUpdate = convertValidObj({ price, stock, name })
  try {
    const [, rows] = await Products.update(valuesToUpdate, {
      where: {
        id
      },
      returning: true
    })

    if (rows.length === 0) {
      return res.status(404).json({
        data: null,
        status: 404,
        message: `product with id ${id} not found`
      })
    }

    return res.status(200).json({
      data: rows[0],
      status: 200,
      message: 'product updated successful'
    })
  } catch (ex) {
    return res.status(500).json({
      status: 500,
      message: `Please contant with our support for more details: ${ex.message}`,
      error: 'Internal server error'
    })
  }
})

productsRouter.delete('/products/:idProduct', validateParamProductId, async (req, res) => {
  const { idProduct } = req.params
  const id = parseInt(idProduct)

  try {
    const affectedRows = await Products.destroy({
      where: {
        id
      }
    })

    if (affectedRows === 0) {
      return res.status(404).json({
        status: 404,
        message: `the product wiht ${id} is not found`
      })
    }

    return res.status(200).json({
      status: 200,
      message: 'product deleted successful'
    })
  } catch (ex) {
    return res.status(500).json({
      status: 500,
      message: `Please contant with our support for more details: ${ex.message}`,
      error: 'Internal server error'
    })
  }
})

export { productsRouter }
