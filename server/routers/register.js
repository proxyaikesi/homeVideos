const USER = require("../model/USER");
const bcrypt = require("bcryptjs");
module.exports = async (req, res) => {
  const { username, password, type } = req.body;
  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }
  let usernameLowerCase = username.toLowerCase();
  try {
    // 检查用户名是否已存在
    if (type === "check") {
      const existingUser = await USER.findOne({ user: usernameLowerCase });
      if (existingUser) {
        return res.status(200).json({ exists: true });
      } else {
        return res.status(200).json({ exists: false });
      }
    } else if (type === "register") {
      if (!password) {
        return res.status(400).json({ message: "Password is required" });
      }
      // 检查用户名是否已存在
      const existingUser = await USER.findOne({ user: usernameLowerCase });
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new USER({
        user: usernameLowerCase,
        password: hashedPassword,
      });
      await newUser.save();
      return res.status(201).json({ message: "User registered successfully" });
    }
  } catch (err) {
    console.error("Error registering user:", err);
    return res.status(500).json({ message: "Error registering user" });
  }
};
