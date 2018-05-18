var express = require('express');
var router = express.Router();

// DBじゃないけど
let users = {};

router.post('/register', function (req, res) {
  let userName = req.body.username;
  let userPass = req.body.password;

  if(users[userName]) {
    res.status(409).json({ error: 'Conflict' });
  }

  users[userName] = {
    username: userName,
    password: userPass
  };
  return res.json({ username: userName });
});

router.post('/login', function (req, res) {
  let userName = req.body.username;
  let userPass = req.body.password;

  if(!users[userName] || users[userName].password !== userPass) {
    res.status(401).json({ error: 'Bad credentials' });
  }

  req.session.authUser = { username: userName };
  return res.json({ username: userName });
});

router.post('/logout', function (req, res) {
  delete req.session.authUser;
  res.json({ ok: true });
});

module.exports = router;
