const mangoose = require('mongoose');
const Schema = mangoose.Schema;

const blogSchema = new Schema ({
    title:{
        type:String,
        required : true,
    },
    snippet:{
        type:String,
        required : true,
        },
    body:{
        type:String,
        required : true,
    }   
},{timestamps:true})  

const Blog = mangoose.model("didier_collection",blogSchema);

//exporting the model to be used in other files
module.exports = Blog;
