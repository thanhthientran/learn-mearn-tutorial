
const cors = require('cors')
const express = require('express')
const db = require('./config/db/index')
const route = require('./routes')

const app = express()
const PORT = process.env.PORT || 5000
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}));
app.use(cors())
db.connect()
route(app)


app.listen(PORT,()=>{console.log(`server listen at http://localhost:${PORT}`)})