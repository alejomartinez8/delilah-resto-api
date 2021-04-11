function validateRequest(req, next, schema) {
  const { error, value } = schema.validate(req.body);

  if (error) {
    next(`Validation error: ${error.details.map((x) => x.message).join(', ')}`);
  } else {
    req.body = value;
    next();
  }
}

module.exports = validateRequest;
