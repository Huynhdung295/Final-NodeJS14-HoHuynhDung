 const multer = require('multer');
 const uploadImage = (type) => {
    
    const storage = multer.diskStorage({
        destination: function(req,res, cb){
            cb(null, `./public/images/${type}`)
        },
        filename: function(req,res,cb){
            cb(null, Date.now()+ "_" + file.originalname);
        },
    })
    const upload= multer({
        storage:storage,
        fileFilter: function(req,res,cb){
            const extensionImageList = [".png", ".jpg"];
            const extension = file.originalname.slice(-4);
            const check = extensionImageList.includes(extension)
            if(check){
                cb(null,true)
            } else{
                cb(new Error("extension không hợp lệ"))
            }
        }
    })
    return upload.single(type)
}

module.exports = uploadImage