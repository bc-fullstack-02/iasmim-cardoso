const { User } = require('../models');

const jwt = require('jsonwebtoken');

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, async (err, obj) => {
    if (err) return res.sendStatus(403);

    req.user = await User.findById(obj.user).populate('profile');

    if (!req.user) {
      return res.status(404).json({ message: 'User not found' });
    }

    next()
  })
}

module.exports = authenticateToken;