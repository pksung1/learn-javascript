const express = require('express')
const path = require('path')
const app = express();

app.set('port', process.env.PORT || 3000)


// app.use((req, res, next) => {
//     console.log('모든 요청에서 실행됨')
//     next();
// })

app.get('/', (req,res, next) => {
    res.send('Hello Express')
    // next();
})

app.get('/home', (req, res, next) => {
    console.log('GET /home 요청 미들웨어')
    next();
})

app.get('/home', (req,res) => {   
    res.sendFile(path.join(__dirname,'/index.html'))
})

app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}번 포트에서 실행`)
})
