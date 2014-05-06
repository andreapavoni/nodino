'use strict';

exports.notFound = function(req, res, next) {
  var err = new Error('404: Not found.');
  err.status = 404;
  next(err);
};

// Render the stack trace
exports.error = function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
};
