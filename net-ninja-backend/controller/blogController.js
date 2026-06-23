const Blog = require('../model/blog');

const homeController = async (req, res) => {
    try {
        // Wait for the database query to complete
        const blogs = await Blog.find().sort({ createdAt: -1 });
        
        res.render('index', {
            title: 'About Didier',
            name: 'didier',
            email: 'didierbazayesu@gmail.com',
            blogs: blogs  // Pass the actual blogs array
        });
    } catch (err) {
        console.log('Error fetching blogs:', err);
        res.status(500).render('404', { title: 'Error' });
    }
}

//creating the blog post
const createBlog = async (req, res) => {  // Changed 'new-blod' to '/new-blog' and fixed parameters
    try {
        console.log('Form data received:', req.body); // Debug: see what data comes in
        
        const { title, snippet, body } = req.body;
        
        // Validate that data exists
        if (!title || !snippet || !body) {
            console.log('Missing fields:', { title, snippet, body });
            return res.status(400).send('All fields are required');
        }
        
        // Create and save the blog
        const blog = new Blog({
            title,
            snippet,
            body
        });
        
        const result = await blog.save();  // Use await for better error handling
        console.log('Blog saved successfully:', result.id);
        
        res.redirect('/');  // Redirect to home page
    } catch (err) {
        console.log('Error saving blog:', err);
        res.status(500).send('Error saving blog: ' + err.message);
    }
};

const deletingBlog = async(req,res)=>{
    try{
        const id = req.params.id;
        //aak the user before deleting the blog
        const result = await Blog.findByIdAndDelete(id);
        result ? res.redirect('/') : res.status(404).send('Blog not found');
    }catch(error){
        console.log('Error deleting blog:', error);
        res.status(500).send('Error deleting blog: ' + error.message);
    }
}

const editingBlog =  async(req,res)=>{
    try{
        const id = req.params.id;
        const blog = await Blog.findById(id);
        if(blog){
            res.render('editBlog', { blog });
        }else{
            res.status(404).send('Blog not found');
        }

    }catch(error){
        console.log('Error editing blog:', error);
        res.status(500).send('Error editing blog: ' + error.message);
    }
}

const editingBlogById = async(req,res)=>{
    try{
        const id = req.params.id;
        const { title, snippet, body } = req.body;
        const result = await Blog.updateOne({ _id: id }, { title, snippet, body });
        result.modifiedCount > 0 ? res.redirect('/') : res.status(404).send('Blog not found or no changes made');   

    }catch(error){
        console.log('Error updating blog:', error);
        res.status(500).send('Error updating blog: ' + error.message);
    }
}

module.exports = {
    homeController,
    createBlog,
    deletingBlog,
    editingBlog,
    editingBlogById
}
   
