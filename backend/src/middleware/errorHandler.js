const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.message === 'فقط فایل‌های ویدیویی مجاز هستند.') {
    return res.status(400).json({ message: err.message });
  }

  if (err.message === 'فقط فایل‌های تصویری مجاز هستند.') {
    return res.status(400).json({ message: err.message });
  }

  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'حجم فایل بیش از حد مجاز است.' });
    }
    return res.status(400).json({ message: err.message });
  }

  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({ message: err.errors[0].message });
  }

  res.status(500).json({ message: 'خطای سرور. لطفاً بعداً تلاش کنید.' });
};

module.exports = errorHandler;
