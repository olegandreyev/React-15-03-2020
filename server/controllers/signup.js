const Router = require('express').Router;
const User = require('../models/user');
const EmailSender = require('../services/email-sender');
const router = Router();

const sender = new EmailSender();

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

  const message = `
  Hello ${user.first_name},
  please verify your email address clicking by the following
  <a href='${req.protocol}://${req.headers.host}/signup/verify?token=${user.verify_email_token}'>link</a>
  (Link will be valid for 6 hours)
  `;
  sender.sendEmail({ content: message, subject: 'Verify Email', to: user.email });
  delete user.password;
  res.send(user)
});

router.get('/check-user', async (req, res) => {
  const { email } = req.query;
  const user = await User.findOne({ email });
  res.send({ isUserExist: !!user })
});

router.get('/verify', async (req, res) => {
  const token = req.query.token;
  await User.findOneAndUpdate({ verify_email_token: token }, {
    is_verified: true,
    verify_email_token: null
  });
  res.redirect('/');
});


module.exports = router;
