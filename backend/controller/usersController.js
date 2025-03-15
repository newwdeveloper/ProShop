import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//@desc auth user and get token
//route POST/api/users/login
//@accesss public
const authUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  //console.log("Entered email:", email);
  //console.log("Entered password:", password);

  const user = await User.findOne({ email });
  //console.log("User found:", user);
  //console.log("User password:", user?.password);

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("invalid user or password");
  }
});

//@desc const registerUser
//route POST/api/users
//@accesss public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User alreay exist");
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("invalid user input");
  }
});

//@desc Logout user/clear cookies
//route POST/api/users/logout
//@accesss privatr

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "logged out successfully" });
});

//@desc get user profile
//route POST/api/users/profile
//@accesss private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      password: user.password,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found!!");
  }
});

//@desc update user profile
//route PUT/api/users/profile
//@accesss private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name; //Updates the name field only if req.body.name is provided; otherwise, it keeps the existing name (user.name).
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }
    const updateUser = await user.save();
    res.status(200).json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found!!");
  }
});

//@desc get all user
//route GET/api/users
//@accesss private/admin

const getUsers = asyncHandler(async (req, res) => {
  res.send("GET USERS");
});

//@desc get user by id
//route GET/api/users/:id
//@accesss private/admin

const getUserByID = asyncHandler(async (req, res) => {
  res.send("GET USERS by id");
});

//@desc delete user
//route delete/api/users/:id
//@accesss private/admin

const deleteUser = asyncHandler(async (req, res) => {
  res.send("deleteUser");
});

//@desc update user
//route PUT/api/users/:id
//@accesss private/admin

const updateUser = asyncHandler(async (req, res) => {
  res.send("update user");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserByID,
  deleteUser,
  updateUser,
};
