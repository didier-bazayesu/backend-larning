import mongoose from "mongoose";


const connectDB = async () => {
    try{
     const MONGODB_URI = process.env['MONGODB_URI'] || ''
     if(!MONGODB_URI){
        throw new Error("MONGODB_URI is not defined in environment variables")
     }
        await mongoose.connect(MONGODB_URI)
        process.on("SIGINT", async () => {
            await mongoose.connection.close()
            console.log("MongoDB connection closed due to app termination")
            process.exit(0)
        })




      
    }catch(error){
        console.error(error)
    }


}

export default connectDB;