const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'video') {
      cb(null, 'src/uploads/videos/');
    } else if (file.fieldname === 'images') {
      cb(null, 'src/uploads/images/');
    } else if (file.fieldname === 'cover') {
      cb(null, 'src/uploads/images/');
    } else {
      cb(null, 'src/uploads/');
    }
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuidv4()}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'video') {
    if (file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('فقط فایل‌های ویدیویی مجاز هستند.'), false);
    }
  } else if (file.fieldname === 'images' || file.fieldname === 'cover') {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('فقط فایل‌های تصویری مجاز هستند.'), false);
    }
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: parseInt(process.env.UPLOAD_MAX_SIZE) || 500 * 1024 * 1024,
  },
});

module.exports = upload;
