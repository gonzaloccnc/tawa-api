export const validateParamProductId = (req, res, next) => {
  const { idProduct } = req.params

  if (isNaN(parseInt(idProduct))) {
    return res.status(400).json({
      status: 400,
      message: `The parameter '${idProduct}' must be a number.`
    })
  }

  next()
}
