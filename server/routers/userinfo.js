// server/routers/userinfo.js

module.exports = (req, res) => {
  console.log("sssssssssssssssssssssss", req.user);
  res.json({ userInfo: req.user });
};
