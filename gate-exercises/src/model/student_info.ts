import mongoose, { Document,Schema } from "mongoose";

interface  studentDto extends  Document{
    name : string,
    email: string,
    phoneNumber: number,
    createdAt: Date,
    updatedAt: Date

  }

  const studentschema = new Schema<studentDto> ({
    name: {type:String, required:true,},
    email: {type:String , unique:true , required: true },
    phoneNumber: {type:Number, required:true }
  },{timestamps:true})

  const StudentInformation = mongoose.model<studentDto>("student",studentschema)
  export default StudentInformation;