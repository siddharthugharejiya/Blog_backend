const BlogModel = require("../model/BlogModel")

const Blog = async(req,res) =>{
    let data= await BlogModel.find()
    // console.log(data);
    if(!data)
    {
    res.json({data : "Data not added"})
    }

    res.json({ data ,  UserId:`${req.body.userId}` })
}
const Blog_Add = async(req,res) =>{
     const {title,image,description} = req.body
     const {userId} = req.body
     let data= await BlogModel.create({
        title,
        image,
        description,
        userId
     })
     console.log(data);
     
     res.json({data})
}
const blog_own = async (req,res) =>{
     console.log(req.body.userId);
     
  const data = await BlogModel.find({userId : req.body.userId}).populate("userId","username email") 
  console.log(data);
  
  res.send({data : data})    
}
const blog_single = async(req,res) =>{
   try { 
      let id = req.params.id
      let data = await BlogModel.findById(id);
      console.log(data);    
      res.status(200).json(data);
  } catch (error) {
      res.status(401).json({ error: "Failed to fetch blog by ID" });
  }

}

const Del = async (req, res) => {
   try {
       const { id } = req.body;
       console.log(id);
       
       const deletedBlog = await BlogModel.deleteOne({_id : id})
       if (deletedBlog) {
           res.status(200).json({ message: "Blog deleted successfully" });
       } else {
           res.status(404).json({ message: "Blog not found" });
       }
   } catch (error) {
       res.status(500).json({ message: "Server error", error: error.message });
   }
};
const edite_get = async (req, res) => {
    const { id } = req.params
  
    try {
      const data = await BlogModel.findById(id);
  
      if (data) {
        res.json(data);
      } else {
        res.status(404).json({ msg: "Blog not found" });
      }
    } catch (error) {
      console.error("Error fetching blog data:", error);
      res.status(500).json({ msg: "Server error" });
    }
  };
  const edite_post = async (req, res) => {
    const { id } = req.params;
    const { title, image, description } = req.body;
  
    try {
      const updatedBlog = await BlogModel.findByIdAndUpdate(
        id,
        { title, image, description },
        { new: true, runValidators: true }
      );
  
      if (updatedBlog) {
        res.status(200).json(updatedBlog);
      } else {
        res.status(404).json({ msg: "Blog not found" });
      }
    } catch (error) {
      res.status(500).json({ msg: "Server error" });
    }
  };
  

 module.exports={Blog,Blog_Add,blog_own , blog_single , Del,edite_get , edite_post}