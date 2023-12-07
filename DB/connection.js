const mongoose = require('mongoose')
const connectionString = process.env.DATABASE
mongoose.connect(connectionString).then(()=> {
    console.log("MomgoDB Atlas successfully connected with BLGServer");
}).catch((err)=>{
    console.log(`MongoDB connection failed!!! Error is ${err}`);
})