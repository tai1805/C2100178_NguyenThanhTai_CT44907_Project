const multer = require('multer');

const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: function(req, file, cb) {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return cb(new Error('Only image!!!!!!!!!'), false);
      }
      cb(null, true);
  }
});

module.exports = upload;