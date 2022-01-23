const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const dotenv = require('dotenv')
const path = require('path')
const multer = require('multer')


const fs = require('fs')

const userRouter = require('./routes/user')

try {
  fs.readdirSync('uploads')
} catch (e) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.')
  fs.mkdirSync('uploads')
}


dotenv.config();

const app = express();


app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// console.log(path.join(__dirname, 'public'))
app.use(
  morgan('dev'),
  express.static('public'),
  express.json(),
  express.urlencoded({extended: false}),
  cookieParser(process.env.COOKIE_SECRET),
)
app.use(session({
  resave: true,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false
  },
  name: 'session-cookie'
}))


app.get('/', (req,res, next) => {
  console.log(req.session)
  req.session.name = 'seonpark'
  res.send('Hello Express')
  next();
})

app.use('/user', userRouter)

app.get('/home', (req, res, next) => {
  console.log('GET /home 요청 미들웨어')
  next();
})

app.get('/home', (req,res) => {   
  res.sendFile(path.join(__dirname,'/index.html'))
})

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads/')
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext)
    },
  }),
  limits: {fileSize: 5 * 1024 * 1024}
})

app.post('/upload', upload.fields([{name: 'image1'}, {name: 'image2'}]), 
(req, res) => {
  console.log(req.files, req.body)
  res.send('ok')
})

app.listen(app.get('port'), () => {
  console.log(`${app.get('port')}번 포트에서 실행`)
})
