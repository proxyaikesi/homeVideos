const jwt = require("jsonwebtoken");
const secretKey = "your-secret-key"; // 从环境变量中加载密钥
const USER = require("../model/USER");

module.exports = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    const user = USER.findById(decoded.id).select("-password"); // 去除密码字段
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (err) {
    res.status(401).json({ message: "Failed to authenticate token" });
  }
};
