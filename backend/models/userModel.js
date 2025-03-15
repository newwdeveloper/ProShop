import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
          // Only validate if the password is NOT hashed
          if (passwordValue.length < 20) {
            // Assuming bcrypt hash is always longer than 20 chars
            return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
              passwordValue
            );
          }
          return true; // Skip validation for already hashed passwords
        },
        message:
          "Password must be at least 8 characters long, contain 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character",
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

userSchema.methods.matchPassword = async function (enteredPassword) {
  //console.log("Entered password for comparison:", enteredPassword);
  //console.log("Stored hashed password:", this.password);

  /*if (!enteredPassword) {
    console.log("ERROR: Entered password is undefined");
    return false;
  }*/

  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
export default User;
