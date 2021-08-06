const User = require("./models/user-model");
module.exports = async function (req, res, next) {
  const { user } = req;
  const typeUser = await User.findOne({ _id: user.userId });
  if (typeUser.type == "ADMIN") {
    return next();
  } else {
    return res
      .status(401)
      .json({ message: "Bạn không đủ quyền truy cập, truy cập bị từ chối!" });
  }
};
