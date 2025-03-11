import bcrypt from "bcryptjs";

const users = [
  {
    name: "adminUser",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("Adminakshay#123", 10),
    isAdmin: true,
  },
  {
    name: "akshay",
    email: "akshay@gmail.com",
    password: bcrypt.hashSync("Adminakshay#123", 10),
    isAdmin: false,
  },
  {
    name: "vinay",
    email: "vinay@gmail.com",
    password: bcrypt.hashSync("Adminakshay#123", 10),
    isAdmin: false,
  },
];

export default users;
