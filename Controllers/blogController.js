const blogs = require('../Models/blogSchema') 

// add blog
exports.addBlogs = async  (req,res) => {
    console.log("Inside add blog function");
    // console.log("Request Body:", req.body);
    const userId = req.payload;
    const { date,name,content } = req.body
    console.log(`${userId}, ${content},${date},${name}`)

    try{
        const newBlog = new blogs({
            date,name,content,userId
        })
        await newBlog.save()
        res.status(200).json(newBlog)
    }catch(err){
        if (err.code === 11000 && err.keyPattern && err.keyPattern.content) {
            // Duplicate key error for 'content'
            const existingBlog = await blogs.findOneAndUpdate({ content }, { date, name, userId });
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
    const searchKey = req.query.search
    const query = {
        name:{$regex:searchKey, $options:"i"}
    }
    try{
        const allBlogs = await blogs.find(query) 
        res.status(200).json(allBlogs)
    }catch(err){
        res.status(401).json(err)
    }
}

// 