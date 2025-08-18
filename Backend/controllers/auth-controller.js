const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const CheckUser = await User.findOne({ $or: [{ username }, { email }] });
    if (CheckUser) {
      console.log(
        `The user you are trying is all  ready exists ${CheckUser.username}  `
      );
      return res.status(400).json({
        success: false,
        message: "User already exists with the same username or email",
      });
    } else {
      const Salt = await bcrypt.genSalt(10);
      const hasPassword = await bcrypt.hash(password, Salt);
      const newlyCreatedUser = new User({
        username,
        email,
        password: hasPassword,
      });
      await newlyCreatedUser.save();
      console.log(
        `[REGISTER]: User '${newlyCreatedUser.username}' created successfully.`
      );

      if (newlyCreatedUser) {
        res.status(201).json({
          success: true,
          message: "User registered successfully",
        });
      } else {
        console.log(`  the user is creation failed |Something went wrong`);
        res.status(400).json({
          success: false,
          message:
            "Unable to register The user please try it again. |Something went wrong",
        });
      }
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "SomeThing Went Wrong",
      error: e.message, // Send the error message to the client
      stack: e.stack,
    });
  }
};
const login = async (req, res) => {
  try {
    console.log("login")
    const { identifier, password } = req.body;
    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }
    const findUsers = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });
    if (!findUsers) {
      return res.status(400).json({
        success: false,
        message: "Invalid username or password",
      });
    } else {
      const isPasswordMatch = await bcrypt.compare(
        password,
        findUsers.password
      );
      if (isPasswordMatch) {
        const accessToken = jwt.sign(
          {
            userID: findUsers._id,
            username: findUsers.username,
            email: findUsers.email,
            role: findUsers.role,
            status: findUsers.status,
          },
          process.env.SECRET,
          {
            expiresIn: "60m",
          }
        );
        console.log(
          `[LOGIN]: User '${findUsers.username}' logged in successfully.`
        );
        return res.status(200).json({
          success: true,
          message: "Login successful",
          token: accessToken, // small change has been made
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Invalid username or password",
        });
      }
    }
  } catch (e) {
    console.error(e);
    
    res.status(500).json({
      success: false,
   
      message: "Something went wrong",
      error: e.message, // Send the error message to the client
      stack: e.stack,
    });
  }
};
module.exports = { register, login };
