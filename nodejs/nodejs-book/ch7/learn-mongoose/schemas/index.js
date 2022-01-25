const mongoose = require('mongoose')

const connect = () => {
    if (process.env.NODE_ENV !== 'production') {
        mongoose.set('debug', true)
    }

    mongoose.connect('mongodb://nodejs:secret@localhost:3003/admin', {
        dbName: 'nodejs',
        useNewUrlParser: true,
    }, (error) => {
        if (error) {
            console.log('몽고디비 연결 에러', error)
        } else {
            console.log('몽고디비 연결 성공')
        }
    })

    mongoose.connection.on('error', (error) => {
        console.error(error)
    })

    mongoose.connection.on('disconnected', () => {
        console.error('연결이 끊어졌습니다, 재연결 시도')
        connect();
    } )

}

module.exports = connect;
