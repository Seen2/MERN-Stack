const validator = require("validator");

const { isEmpty } = require("./is-empty");

const validatePostInput = data => {
  let errors = {};
  data.text = !isEmpty(data.text) ? data.text : "";

  if (!validator.isLength(data.text, { min: 3, max: 10000 })) {
    errors.text = "Post must be between 3 and 10000 characters";
  }

  if (validator.isEmpty(data.text)) {
    errors.text = "Text feild is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = {
  validatePostInput
};
