import mongoose, { Document, Schema } from "mongoose";

export  interface IProduct extends Document {
    name: string,
    productId : string,
    title: string,
    userId : mongoose.Types.ObjectId,
    content : string,
    createAt : Date,
    updatedAt: Date,

}

const productSchema : Schema<IProduct> = new Schema({
    name: {type:String, required:true },
    content: {type:String, required : true},
    title : {type:String , required : true },
    userId: {type:mongoose.Types.ObjectId, ref:"User",required: true },
    productId:{type: String , default: (): string => Math.round(Math.random() * 10000).toString()},


},{timestamps:true})


const Product  =  mongoose.model<IProduct>("Product",  productSchema)
export default Product;