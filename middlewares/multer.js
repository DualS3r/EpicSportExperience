const multer = require("multer");

let uploadImage = (folder) => {
  const storage = multer.diskStorage({
    destination : `public/assets/media/images/${folder}`,
    filename: function(req, file, cb){
      console.log(file);
      let originalName = file.originalname;
      let extension = originalName.slice(originalName.lastIndexOf("."), originalName.length);
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix+ "-" + file.originalname);
    }
  })

  const upload = multer({storage: storage}).single("img"); //file = campo id de input (html).

  return upload;
}

module.exports = uploadImage;