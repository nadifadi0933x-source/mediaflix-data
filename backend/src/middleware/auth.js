const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'دسترسی رد شد. توکن مورد نیاز است.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    
    if (!user) {
      return res.status(401).json({ message: 'توکن نامعتبر است.' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'توکن نامعتبر است.' });
  }
};

const adminOnly = async (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'دسترسی محدود به مدیران.' });
  }
  next();
};

module.exports = { auth, adminOnly };
