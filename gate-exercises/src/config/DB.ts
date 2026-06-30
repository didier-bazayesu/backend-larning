import mongoose from "mongoose";

const Database = async ()=> {
    try{
        const connection_String = process.env["MONGODB_URI"];
        if(!connection_String) throw new Error ("there is not connection String specified")
      const conn = await mongoose.connect(connection_String)
    if(conn.connection.readyState === 1)  { console.log("The database is now connected")}
    }catch(err){
        console.log(err)
    }
}

export default Database;