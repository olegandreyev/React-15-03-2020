const Router = require('express').Router;
const User = require('../models/user');
const router = Router();

router.post('/', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
  } catch (err) {
    if (err.code === 11000) {
      return res.sendHTTPError(400, `User with ${user.email} already exists`)
    }
    throw err;
  }
  delete user.password;
  res.send(user)
});

router.get('/check-user', async (req, res) => {
  const { email } = req.query;
  const user = await User.findOne({ email });
  res.send({ isUserExist: !!user })
});


module.exports = router;
