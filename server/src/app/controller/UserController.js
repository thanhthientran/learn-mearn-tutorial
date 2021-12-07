require('dotenv').config({ path: __dirname + '/../../.env' })
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const User = require('../models/User')


class UserController {
    test(req, res, next) {
        res.send(`/api/auth/register or /api/auth/login`)
    }

    // Register - login 

    // [post] /api/auth/register
    async register(req, res, next) {
        const { username, password } = req.body
        if (!username || !password)
            return res.json({ success: false, message: 'missing username or password' })
        try {
            const user = await User.findOne({ username })
            if (user)
                return res.json({ success: false, message: 'username already' })

            //save newUser to mongodb
            const hashedPassword = await argon2.hash(password)
            const newUser = new User({ username, password: hashedPassword })
            await newUser.save()

            //return token by jsonwebtoken
            const accessToken = await jwt.sign({
                userId: newUser._id
            }, process.env.ACCESS_TOKEN_SECRET)

            return res.json({ success: true, message: 'register successfully!', accessToken })
        }
        catch (err) {
            console.log('fail')
            res.json({ success: false, message: 'something is wrong' })
        }
    }

    // [get] /api/auth/login
    async login(req, res, next) {
        const { username, password } = req.body
        if (!username || !password)
            return res.json({ success: false, message: 'missing username or password' })
        try {
            //check user
            const user = await User.findOne({ username })
            // not found username
            if (!user)
                return res.json({ success: false, message: 'incorrect username or password' })

            // username found
            const passwordValid = await argon2.verify(user.password, password)
            //check password
            if (!passwordValid)
                return res.json({ success: false, message: 'incorrect username or password' })

            //return token by jsonwebtoken
            const accessToken = await jwt.sign({
                userId: user._id
            }, process.env.ACCESS_TOKEN_SECRET)

            return res.json({ success: true, message: 'login successfully!', accessToken })

        } catch (error) {
            console.log('fail')
            res.json({ success: false, message: 'something is wrong' })
        }
    }


    //[get] /api/auth/
    //check user is logged in
    async checkUser(req,res,next){
        try {
            const user = await User.findOne({ _id: req.userId }).select('-password')
            res.json({ success: true, user})            
        } catch (error) {
            console.log(error)
            res.json({success:false, message: error.message})
        }
         
    }
}

module.exports = new UserController