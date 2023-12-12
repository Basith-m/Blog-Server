const blogs = require('../Models/blogSchema') 

// add blog
exports.addBlogs =  (req,res) => {
    console.log("Inside add blog function");
    console.log("Request Body:", req.body);
    const userId = req.payload;
    const { date,content } = req.body
    console.log(`${userId}, ${content},${date}`);
    res.status(200).json("addBlogs request recieved...")
}