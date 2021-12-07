const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username :{type: 'string',required: true, unique: true},
    password :{type: 'string',required: true},
},{
    timestamps: true
})

module.exports = mongoose.model('Users', UserSchema)