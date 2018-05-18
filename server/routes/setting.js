var express = require('express');
var router = express.Router();

// DBじゃないけど
let settings = {};

router.get('/', function (req, res) {
  if(!req.session.authUser) {
    return res.status(401).json({ error: 'Bad credentials' });
  }
  let username = req.session.authUser.username;
  if(settings[username]) {
    return res.json(settings[username]);
  }
  return res.json({});
});

router.post('/save', function (req, res) {

  let username = req.session.authUser.username;
  if(!username) {
    res.status(401).json({ error: 'Bad credentials' });
  }

  let setting = {
    name: req.body.name,
    department: req.body.department,
    place: req.body.place,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    breakTime: req.body.breakTime
  };

  settings[username] = setting;
  return res.json(setting);
});


module.exports = router;
