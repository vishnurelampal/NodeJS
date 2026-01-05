const validator = require("validator");
function validateSignUp(req) {
  const { firstName, lastName, emailId, age, dateOfBirth, gender } = req.body;
  if (!firstName || !lastName || !emailId || !age || !dateOfBirth || !gender) {
    throw new Error("All fields are required");
  } else if (age < 18) {
    throw new Error("Age must be at least 18");
  } else if (!validator.isStrongPassword(req.body.password)) {
    throw new Error("Password is not strong enough");
  }
}
module.exports = validateSignUp;
