class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super()
    this.statusCode = statusCode
    this.message = message
  }
}

exports.handleError = (err, res) => {
  const statusCode = err.statusCode ? err.statusCode : 500;
  const message = err.message ? err.message : "Something went wrong"
  if (err) {
    return res.status(statusCode).json({
      hasError: true,
      statusCode: statusCode,
      message,
    })
  }
}

exports.errorHandle = (statusCode, err, res) => {
  if (err) {
    return res.status(statusCode).json({
      hasError: true,
      statusCode: statusCode,
      message: err,
    })
  }
}

module.exports = ErrorHandler