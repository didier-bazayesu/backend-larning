import mongoose , {Schema, Document} from 'mongoose';

export interface IBlog extends Document {
    title : String ,
    content : String , 
    imageUrl : string ,
    author : mongoose.Types.ObjectId, 
    createdAt : Date ,
    updatedAt : Date
}
const BlogSchema: Schema<IBlog>  = new Schema({
    title : {type: String , required : true},
    content : {type:String , required : true},
    imageUrl : {type: String , required : false},
    author: {type: mongoose.Types.ObjectId, ref: 'User', required : true},

},{timestamps : true });
 

const  Blog = mongoose.model<IBlog>('Blog',BlogSchema)
export default Blog;