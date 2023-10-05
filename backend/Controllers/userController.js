// Required modules and models
const User = require('../Models/userSchema');
const userValSchema = require('../Validations/userValidation');

/**
 * Register a new user.
 * @param {Object} req - Express request object containing user data in the body.
 * @param {Object} res - Express response object to send the response.
 * @returns {Object} - JSON response indicating success or failure.
 */
const addUser = async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    // Checking for Validations using Joi
    const { error } = userValSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Taking username and password and checking if user already exists or not
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Creating newUser using mongoose model
    const newUser = await User.create({ name, email, phone });

    return res.status(201).json({
      message: 'User registered successfully',
      user: newUser,
    });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ error: 'Registration failed' });
  }
};

module.exports = {
  addUser,
};
