const Router = require('express').Router;
const { requireAuth } = require("../middlewares");
const User = require('../models/user');
const router = Router();

router.get('/', requireAuth, async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

router.get('/me', requireAuth, async (req, res) => {
  const user = await User.findById(req.userId);
  res.send(user)
});


module.exports = router;
