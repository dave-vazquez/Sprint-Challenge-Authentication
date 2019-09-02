const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Users = require('./authModel');

router.post('/register', async (req, res) => {
  let user = req.body;

  try {
    user.password = bcrypt.hashSync(user.password, 10);
    user = await Users.add(user);

    res.status(201).json({
      user,
      token: generateToken(user)
    });
  } catch (err) {
    res.status(500).json({
      err: err.message
    });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Users.findBy({ username }).first();

    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        token: generateToken(user)
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

function generateToken(user) {
  const payload = {
    subject: 'user',
    username: user.username
  };

  const options = {
    expiresIn: '1h'
  };

  return jwt.sign(
    payload,
    process.env.LOGIN_SECRET || 'sooperdoopersecret',
    options
  );
}

module.exports = router;
