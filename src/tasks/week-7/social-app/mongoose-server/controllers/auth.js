const Router = require('express').Router;
const User = require('../models/user');
const router = Router();


router.post('/', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user) { return res.sendHTTPError(401, 'Invalid login or password') }
  const authToken = await user.signIn(password);
  res.send({ authToken, user })
});


module.exports = router;
