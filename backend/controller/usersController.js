import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

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
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30day",
    });
    //set JWT as http-only coockie

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

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
  res.send("resgister user");
});

//@desc Logout user/clear cookies
//route POST/api/users/logout
//@accesss privatr

const logoutUser = asyncHandler(async (req, res) => {
  res.send("logout user");
});

//@desc get user profile
//route POST/api/users/profile
//@accesss private

const getUserProfile = asyncHandler(async (req, res) => {
  res.send("get user profile");
});

//@desc update user profile
//route PUT/api/users/profile
//@accesss private

const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("update user profile");
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
