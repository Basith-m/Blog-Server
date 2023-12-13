// Define Server
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const router = require('./Routes/router')
require('./DB/connection')

// create an express application
const BLGServer = express()
BLGServer.use(bodyParser.json({ limit: '50mb' }));
BLGServer.use(cors())
BLGServer.use(express.json())
BLGServer.use(router)
const PORT = 4000 || process.env.PORT
BLGServer.listen(PORT,()=>{
    console.log(`BLGServer started at port : ${PORT} and waiting for client request...`);
})

BLGServer.get('/',(req,res)=> {
    res.send(`<h1>BLGServer started and waiting for client request...</h1>`)
})