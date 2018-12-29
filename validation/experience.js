const validator = require("validator");

const { isEmpty } = require("./is-empty");

const validateExperienceInput = data => {
  let errors = {};
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  data.title = !isEmpty(data.title) ? data.title : "";

  if (validator.isEmpty(data.title)) {
    errors.title = "Job Title feild is required";
  }
  if (validator.isEmpty(data.company)) {
    errors.company = "Company feild is required";
  }
  if (validator.isEmpty(data.from)) {
    errors.from = "From date feild is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = {
  validateExperienceInput
};
