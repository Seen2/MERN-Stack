const validator = require("validator");

const { isEmpty } = require("./is-empty");

const validateRegisterInput = data => {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.email = !isEmpty(data.email) ? data.email : "";

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 charactors";
  }
  if (validator.isEmpty(data.name)) {
    errors.name = "Name feild is required";
  }
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

  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "Password must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = {
  validateRegisterInput
};
