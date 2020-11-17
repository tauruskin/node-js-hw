exports.validate = function validate(scheme, message) {
  return (req, res, next) => {
    const validationResult = scheme.validate(req.body);
    
    if (validationResult.error) {
      return res.status(400).send(message);
    }
    next();
  };
};