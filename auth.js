const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
  
  const token = req.header("x-auth-token");
 
  // console.log(token)
  if (!token)
    return res
      .status(401)
      .json({ message: "Bạn không đủ quyền truy cập, truy cập bị từ chối!" });
  try {
    const decoded = jwt.verify(token, "supersecretkey");
    req.user = decoded;
    // console.log(decoded)
    next();
  } catch (err) {
    res.status(401).json({ message: "Token hết hiệu lực" });
  }
};
