exports.notFound = (req, res, next) ->
  err = new Error("404: Not found.")
  err.status = 404
  next err
  return

# Render the stack trace
exports.error = (err, req, res, next) ->
  res.status err.status or 500
  res.render "error",
    message: err.message
    error: err
  return
