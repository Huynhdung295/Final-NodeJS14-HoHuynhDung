const mkdirp = require("mkdirp");
const multer = require("multer");

const uploadImage = (type) => {
  const made = mkdirp.sync(`./images/${type}`);
  const storage = multer.diskStorage({
      destination: function(req,file,cb){
          cb(null, `./images/${type}`);
      },
      filename: function(req,file,cb){
          cb(null, Date.now()+ "_" + file.originalname)
      }
  })
  const upload = multer({
      storage: storage,
      fileFilter: function(req, file,cb){
          const extensionImageList = [".png", ".jpg"];
          const extension = file.originalname.slice(-4);
          const check = extensionImageList.includes(extension);
          if(check){
              cb(null, true); 
          } else{
              cb(new Error("extension không hợp lệ"));
          }
      }
  });
  return upload.single(type)
};

module.exports = uploadImage
