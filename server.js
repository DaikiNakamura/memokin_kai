const { Nuxt, Builder } = require('nuxt');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = require('express')();

const auth = require('./server/routes/auth');
const setting = require('./server/routes/setting');
const kintai = require('./server/routes/kintai');

// req.body へアクセスするために body-parser を使う
app.use(bodyParser.json());

// session
app.use(session({
  secret: 'super-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 6000000 }
}));

// 認証系
app.use('/api/auth', auth);
app.use('/api/setting', setting);
app.use('/api/kintai', kintai);

// Nuxt.jsをインスタンス化
let config = require('./nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

app.use(nuxt.render)
app.listen(3000)
console.log('Server is listening on http://localhost:3000')
