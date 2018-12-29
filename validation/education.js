const validator = require("validator");

const { isEmpty } = require("./is-empty");

const validateEducationInput = data => {
  let errors = {};
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  data.school = !isEmpty(data.school) ? data.school : "";
  data.feildofstudy = !isEmpty(data.feildofstudy) ? data.feildofstudy : "";

  if (validator.isEmpty(data.school)) {
    errors.school = "School Name feild is required";
  }
  if (validator.isEmpty(data.degree)) {
    errors.degree = "Degree feild is required";
  }
  if (validator.isEmpty(data.from)) {
    errors.from = "From date feild is required";
  }
  if (validator.isEmpty(data.feildofstudy)) {
    errors.feildofstudy = "Feild of study is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = {
  validateEducationInput
};
