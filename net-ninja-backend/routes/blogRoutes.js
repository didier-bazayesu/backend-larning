const router = require('express').Router();
const{ homeController,createBlog,deletingBlog ,editingBlog,editingBlogById} = require('../controller/blogController');

//Home route with proper async/await
router.get('/', homeController);
router.get('/about', (req, res) => {
    res.render('about');
});
// redirect 
router.get('/about-me', (request, response) => {
    response.redirect(302, '/about');
});
// GET route - Show the form
router.get('/new-blog', (req, res) => {
    res.render('newBlog');
});
// FIXED POST route - Corrected typos
router.post('/new-blog', createBlog);
//deleting a blog
router.get('/delete_blog/:id', deletingBlog); 
//eting the single blog
router.get('/edit_blog/:id', editingBlog);
//then edit using updateOne method
router.post('/edit_blog/:id',editingBlogById); 

module.exports = router ;
