const blogs = require('../Models/blogSchema') 

// add blog
exports.addBlogs = async  (req,res) => {
    console.log("Inside add blog function");
    // console.log("Request Body:", req.body);
    const userId = req.payload;
    const { date,content } = req.body
    // console.log(`${userId}, ${content},${date}`)

    try{
        const newBlog = new blogs({
            date,content,userId
        })
        await newBlog.save()
        res.status(200).json(newBlog)
    }catch(err){
        if (err.code === 11000 && err.keyPattern && err.keyPattern.content) {
            // Duplicate key error for 'content'
            const existingBlog = await blogs.findOneAndUpdate({ content }, { date, userId });
            return res.status(200).json(existingBlog); // Return the existing blog data
        }
        res.status(401).json(`Request failed, Error : ${err}`)
    }
}

// userBlogs
exports.allUserBlogs = async (req,res) => {
    const userId = req.payload
    try{
        const userblogs = await blogs.find({userId}) 
        res.status(200).json(userblogs)
    }catch(err){
        res.status(401).json(err)
    }
}

//  getallBlogs
exports.getAllBlogs = async (req,res) => {
    try{
        const allBlogs = await blogs.find() 
        res.status(200).json(allBlogs)
    }catch(err){
        res.status(401).json(err)
    }
}