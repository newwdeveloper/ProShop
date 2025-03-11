import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Removes leading & trailing spaces
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true, // Removes unnecessary spaces
      validate: {
        validator: function (emailValue) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
        },
        message: "Invalid email format",
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (passwordValue) {
          return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            passwordValue
          );
        },
        message:
          "Password must be at least 8 characters, include 1 uppercase, 1 lowercase, 1 number, and 1 special character",
      },
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
