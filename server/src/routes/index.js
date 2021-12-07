const auth = require('./auth')
const post = require('./post')

function route(app){
    app.use('/api/auth',auth)
    app.use('/api/post',post)
}

module.exports = route