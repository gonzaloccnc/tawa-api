import { ValidationError } from 'sequelize'

export const modelHandlingError = (ex) => {
  if (ex instanceof ValidationError) {
    return {
      data: null,
      status: 400,
      message: 'bad request',
      errors: ex.errors.map(error => ({
        message: error.message,
        field: error.path,
        value: error.value
      }))
    }
  } else {
    return {
      status: 500,
      error: 'Internal Server Error',
      message: 'Contact with our support for more details'
    }
  }
}
