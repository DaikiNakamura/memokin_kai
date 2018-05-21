let express = require('express');
let router = express.Router();
const jconv = require( 'jconv' );
const Moment = require('moment');
Moment.locale('ja');



// DBじゃないけど
let kintai = {};

router.get('/', function (req, res) {
  return res.json({});
});

router.get('/:yyyyMm', function (req, res) {
  if(!req.session.authUser) {
    return res.status(401).json({ error: 'Bad credentials' });
  }
  let username = req.session.authUser.username;
  let yyyyMm = req.params.yyyyMm;

  // no data
  if(!kintai[username] || !kintai[username][yyyyMm]) {
    return res.json({data: []});
  }

  let targetKintai = kintai[username][yyyyMm];
  return res.json({data: targetKintai});
});

router.get('/csv/:yyyyMm', function (req, res) {
  if(!req.session.authUser) {
    return res.status(401).json({ error: 'Bad credentials' });
  }
  let username = req.session.authUser.username;
  let yyyyMm = req.params.yyyyMm;

  // no data
  let data = [];
  if(kintai[username] && kintai[username][yyyyMm]) {
    data = kintai[username][yyyyMm];
  }

  // download
  const filename = 'work_report_' + yyyyMm;
  res.setHeader( 'Content-disposition', 'attachment; filename*=UTF-8\'\'' + encodeURIComponent( filename + '.csv' ) );
  res.setHeader( 'Content-Type', 'text/csv; charset=Shift_JIS' );

  let str = '';
  for (let i = 0; i < data.length; i++) {
    str += data[i].date + ',';
    str += data[i].startTime + ',';
    str += data[i].endTime + ',';
    str += data[i].breakTime + ',';
    str += data[i].memo;
    str += '\r\n';
  }

  res.write( jconv.convert( str, 'UTF8', 'SJIS' ) );
  res.end();
});

router.post('/add', function (req, res) {
  if(!req.session.authUser) {
    return res.status(401).json({ error: 'Bad credentials' });
  }
  let username = req.session.authUser.username;
  let yyyyMm = new Moment(req.body.date).format('YYYYMM');
  let data = {
    date: req.body.date,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    breakTime: req.body.breakTime,
    memo: req.body.memo
  };

  if(!kintai[username]) {
    kintai[username] = {};
  }

  if(!kintai[username][yyyyMm]) {
    kintai[username][yyyyMm] = [];
  }

  // 重複後勝ちで
  let newArray = kintai[username][yyyyMm].filter((day) => {
    return day.date !== data.date;
  });
  newArray.push(data);

  kintai[username][yyyyMm] = newArray;
  return res.json({data: kintai[username][yyyyMm]});
});

module.exports = router;
