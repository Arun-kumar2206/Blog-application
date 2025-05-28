import Blog from '../models/Blog.js';

export const getBlogs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        const blogs = await Blog.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Blog.countDocuments();

        res.json({
            blogs,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalBlogs: total
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json(blog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const blog = new Blog({
            title,
            content,
            author: req.user._id,
            authorName: req.user.name
        });

        await blog.save();
        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this blog' });
        }

        blog.title = title;
        blog.content = content;
        await blog.save();

        res.json(blog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this blog' });
        }

        await blog.deleteOne();
        res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};