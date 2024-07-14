// server/middleware/authMiddleware.js
// 后端验证令牌和获取用户信息示例中间件
const jwt = require("jsonwebtoken");
const User = require("../model/USER");
const secretKey = "your-secret-key"; // 从环境变量中加载密钥

function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1]; // 从请求头中获取令牌
  if (!token) {
    return res.status(401).json({ message: "未提供令牌" });
  }

  jwt.verify(token, secretKey, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "令牌验证失败" });
    }

    try {
      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        return res.status(404).json({ message: "用户不存在" });
      }

      req.user = user; // 将用户信息存储在请求对象中
      next(); // 继续处理请求
    } catch (error) {
      console.error("获取用户信息失败", error);
      res.status(500).json({ message: "服务器错误" });
    }
  });
}

module.exports = verifyToken;
