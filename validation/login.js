const validator = require("validator");

const { isEmpty } = require("./is-empty");

const validateLoginInput = data => {
  let errors = {};
  data.password = !isEmpty(data.password) ? data.password : "";
  data.email = !isEmpty(data.email) ? data.email : "";

  if (validator.isEmpty(data.email)) {
    errors.email = "Email feild is required";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "Email is Invalid";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Password feild is required";
  }
  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password atleast to be of 6 charactors";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = {
  validateLoginInput
};
