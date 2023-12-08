const users = require('../Models/userSchema')
const jwt = require('jsonwebtoken')

//logic for register
exports.register = async (req, res) => {
    console.log("Inside register Controller function");
    const { username, email, password } = req.body
    // console.log(`${username},${email}, ${password}`);

    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(406).json("Account already exist")
        }
        else {
            const newUser = new users({
                username,
                email,
                password,
                profile: ""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (err) {
        res.status(401).json(`Register API Failed..Error : ${err}`)
    }
}

//logic for login
exports.login = async (req, res) => {
    console.log("Inside login function");
    const { email, password } = req.body
    try {
        const existingUser = await users.findOne({ email, password }) //key value same
        if (existingUser) {
            const token = jwt.sign({userId:existingUser._id} ,"Blg1234")
            res.status(200).json({ existingUser,token })
        } else {
            res.status(404).json("Incorrect Email / Password")
        }
    } catch (err) {
        res.status(401).json(`Register API Failed. Error : ${err}`)
    }
}