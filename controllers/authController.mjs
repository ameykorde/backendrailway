// Import necessary modules
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/registerSchema.mjs';

// Function to register user
const registerUser = async (req, res) => {
  try {
    const { name, username, id, password, is_admin } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ username: username });
    const checkID = await User.findOne({ id: id });
    if (userExists) {
      res.send({ error: 'User already registered' });
    } else if (!checkID) {
      res.send({ error: 'Invalid ID' });
    } else {
      // Create new user and save to database
      const user = new User({
        name,
        username,
        password,
        is_admin,
      });
      await user.save();
      res.send({ message: 'User registered successfully' });
    }
  } catch (err) {
    console.log(err);
  }
};


// Function to login user
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(400).send({ error: 'Invalid Credentials' });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: 'Invalid Credentials' });
    }

    // Create JWT token and send as response
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.header('auth-token', token).send({
      message: 'Logged in successfully',
      token: token,
      id: user._id,
      is_admin: user.is_admin
    });
  } catch (err) {
    console.log(err);
  }
};

// Get all user data excluding the first user - which is id
const getUserData = async (req, res) => {
  try {
    const users = await User.find({}, { id: 0, username: 0, password: 0 }).skip(1);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

// Delete user with specified id
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

// Update user's admin status with specified id
const updateUserStatus = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { is_admin: req.body.is_admin } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}


// Export the functions
export {
  registerUser,
  loginUser,
  getUserData,
  deleteUser,
  updateUserStatus
};