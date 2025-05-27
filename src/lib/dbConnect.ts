import mongoose from "mongoose";

type connectionObject = {
    isConnected?: number
}

const connection : connectionObject = {}

async function dbConnect() : Promise<void>{
    if(connection.isConnected)
    {
        console.log("Database is already connected")
        return;
    }

    try {
    const db =    await mongoose.connect(process.env.MONGODB_URI || "")
        
    connection.isConnected = db.connections[0].readyState

    console.log("first", "db connect successfully")
    } catch (error) {
        console.log(error)

        process.exit(1)
    }

}

export default dbConnect;