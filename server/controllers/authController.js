// authController.js
const User = require("../models/userModel"); // Assuming this is your User model
const bcrypt = require("bcrypt"); // You may need to install this package

// authController.js
const authController = {
  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (user && bcrypt.compareSync(password, user.password)) {
        // Successful login
        res.status(200).json({ success: true, message: "Login successful", userId: user._id });
      } else {
        // Invalid email or password
        res
          .status(401)
          .json({ success: false, message: "Invalid email or password" });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error"});
    }
  },
};

module.exports = authController;
