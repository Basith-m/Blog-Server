const express = require('express')
const router = new express.Router()
const userController = require('../Controllers/userController')
const blogController = require('../Controllers/blogController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')

// register API
router.post('/user/register',userController.register)

// login
router.post('/user/login',userController.login)

// add-blog 
router.post('/blog/add',jwtMiddleware,blogController.addBlogs)

module.exports = router