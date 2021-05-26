const { checkEmailExists, checkTelExists } = require("../data/validation");

const signUpSchema = {
  email: {
    normalizeEmail: true,
    custom: {
      options: (email) => {
        return checkEmailExists(email).then((rows) => {
          if (rows > 0) {
            return Promise.reject("E-mail already in use");
          }
        });
      },
    },
  },
  password: {
    isLength: {
      errorMessage:
        "Password must be greater than 6 and contain at least one uppercase letter, one lowercase letter, and one number",
      options: [
        [
          { min: 6 },
          { minLowercase: 1 },
          { minUppercase: 1 },
          { minNumbers: 1 },
        ],
      ],
    },
  },
  first_name: {
    notEmpty: true,
    errorMessage: "First name cannot be empty",
  },
  last_name: {
    notEmpty: true,
    errorMessage: "First name cannot be empty",
  },
  tel: {
    custom: {
      options: (tel) => {
        return checkTelExists(tel).then((rows) => {
          if (rows > 0) {
            return Promise.reject("Phone number already in use");
          }
        });
      },
    },
    notEmpty: true,
    errorMessage: "Phone number cannot be empty",
  },
};

exports.signUpSchema = signUpSchema;

const petsAddSchema = {
  pet_type: {
    notEmpty: true,
  },
  pet_name: {
    notEmpty: true,
    errorMessage: "Name cannot be empty",
    isLength: {
      errorMessage: "Name's too short",
      options: { min: 2 },
    },
  },
  adopt_status: {
    isIn: {
      errorMessage: "Choose existing status",
      options: [["Adopted", "Fostered", "Looking For Home"]],
    },
  },
  pet_height: {
    errorMessage: "Wrong height",
    isInt: true,
  },
  pet_weight: {
    errorMessage: "Wrong weight",
    isInt: true,
  },
  color: {
    isLength: {
      errorMessage: "Wrong color",
      options: { min: 2, max: 50 },
    },
  },
  bio: {
    isLength: {
      errorMessage: "Bio should be at least 3 characters",
      options: { min: 3, max: 50 },
    },
  },
  diet_restr: {
    isLength: {
      errorMessage: "Diet restrictions field should be at least 2 characters",
      options: { min: 2, max: 50 },
    },
  },
  breed: {
    isLength: {
      errorMessage: "Breed should be at least 3 characters",
      options: { min: 3, max: 50 },
    },
  },
};

exports.petsAddSchema = petsAddSchema;