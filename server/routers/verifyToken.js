const jwt = require("jsonwebtoken");
const secretKey = "your-secret-key"; // 从环境变量中加载密钥

module.exports = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // 提取 token
  console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;;;", req.headers.authorization);

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Failed to authenticate token" });
    }
    res.json({ valid: true });
  });
};
