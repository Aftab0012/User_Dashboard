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
  const { firstname, lastname, email, department } = req.body;

  try {
    // Checking for Validations using Joi
    const { error } = userValSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Capitalize the first letter of firstname, lastname, and department
    const capitalizedFirstname =
      firstname.charAt(0).toUpperCase() + firstname.slice(1);
    const capitalizedLastname =
      lastname.charAt(0).toUpperCase() + lastname.slice(1);
    const capitalizedDepartment =
      department.charAt(0).toUpperCase() + department.slice(1);

    // Taking username and password and checking if user already exists or not
    const existingUser = await User.findOne({
      firstname: capitalizedFirstname,
    });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Creating newUser using mongoose model
    const newUser = await User.create({
      firstname: capitalizedFirstname,
      lastname: capitalizedLastname,
      email,
      department: capitalizedDepartment,
    });

    return res.status(201).json({
      message: 'User registered successfully',
      user: newUser,
    });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ error: 'Registration failed' });
  }
};

async function getAllUsers(req, res) {
  try {
    // Implement logic to fetch all users from the database
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching users' });
  }
}

async function updateUser(req, res) {
  const userId = req.params._id; // Get the user ID from the request parameters
  const updatedUserData = req.body;
  try {
    // Implement logic to update a user by userId with updatedUserData
    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {
      new: true, // Return the updated user
      runValidators: true, // Run validators for updates
    });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating user' });
  }
}

async function deleteUser(req, res) {
  const userId = req.params._id; // Get the user ID from the request parameters
  try {
    // Implement logic to delete a user by userId
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting user' });
  }
}

module.exports = {
  addUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
