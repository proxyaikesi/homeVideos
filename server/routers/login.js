const USER = require("../model/USER");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secretKey = "your-secret-key"; // 从环境变量中加载密钥
module.exports = async (req, res) => {
  const { username, type, password } = req.body;
  console.log(type, "ssssssssssssssssssssssssssssssssssss");
  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }
  try {
    const usernameLowerCase = username.toLowerCase();
    if (type === "check") {
      const existingUser = await USER.findOne({ user: usernameLowerCase });
      if (existingUser) {
        return res.status(200).json({ exists: true });
      } else {
        return res.status(200).json({ exists: false });
      }
    } else if (type === "password") {
      if (!password) {
        return res.status(400).json({ message: "Password is required" });
      }
      // 查找用户
      const user = await USER.findOne({ user: usernameLowerCase });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Invalid username or password" });
      }
      console.log("ssssssssssssssss", user);

      // 检查密码是否匹配
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
      }
      // 生成 JWT 令牌
      const token = jwt.sign(
        { id: user._id, username: user.username },
        secretKey,
        { expiresIn: "1h" }
      );
      // 给前端返回token
      console.log("user", user);
      return res.status(200).json({ message: "Login successful", token, user });
    } else {
      return res.status(400).json({ message: "Invalid request type" });
    }
  } catch (err) {
    console.error("Error processing request:", err);
    return res.status(500).json({ message: "Error processing request" });
  }
};
