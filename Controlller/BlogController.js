const BlogModel = require("../model/BlogModel");

const Blog = async (req, res) => {
  try {
    const data = await BlogModel.find();
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No blogs found" });
    }
    return res.status(200).json({ data, UserId: `${req.body.userId}` });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const Blog_Add = async (req, res) => {
  const { title, image, description, author, createdAt, userId } = req.body;
  try {
    const data = await BlogModel.create({
      title,
      image,
      description,
      author,
      createdAt,
      userId,
    });
    return res.status(201).json({ data });
  } catch (error) {
    return res.status(500).json({ message: "Failed to add blog", error: error.message });
  }
};

const blog_own = async (req, res) => {
  try {
    const data = await BlogModel.find({ userId: req.body.userId }).populate("userId", "username email");
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching user blogs", error: error.message });
  }
};

const blog_single = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await BlogModel.findById(id);
    if (!data) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch blog by ID", error: error.message });
  }
};

const Del = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedBlog = await BlogModel.deleteOne({ _id: id });
    if (deletedBlog.deletedCount === 0) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const edite_get = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await BlogModel.findById(id);
    if (!data) {
      return res.status(404).json({ msg: "Blog not found" });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ msg: "Server error", error: error.message });
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
    if (!updatedBlog) {
      return res.status(404).json({ msg: "Blog not found" });
    }
    return res.status(200).json(updatedBlog);
  } catch (error) {
    return res.status(500).json({ msg: "Server error", error: error.message });
  }
};

module.exports = { Blog, Blog_Add, blog_own, blog_single, Del, edite_get, edite_post };
