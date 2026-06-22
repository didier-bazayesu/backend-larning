import mongoose , { Document,Schema } from "mongoose";

export interface IUser extends Document {
    name : string ,
    email : string ,
    password : string ,
    createdAt : Date,
    upDatedAt : Date
}

const userSchema=new Schema<IUser>({

    name: {type:String, unique:false ,required : true , trim:true},
    email : {type:String, unique:true ,required : true , trim:true,lowercase:true},
    password: {type:String ,required : true }

},{timestamps: true})

const User = mongoose.model<IUser>("User", userSchema);
export default User 

