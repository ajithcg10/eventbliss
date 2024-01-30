import mongoose from "mongoose";

export  async function connect () {
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection
        connection.on('connected' , () =>{
            console.log("mongoose connected successfully");
            
        })
        connection.on('error',(err)=>{
            console.log("mongoose error " + err.message);
            process.exit()
            
        })
    } catch (error) {
        console.log("something went wrong")
        console.log(error)
    }
}



// import mongoose from 'mongoose';

// const MONGODB_URI = process.env.MONGODB_URI;

// let cached = (global as any).mongoose || { conn: null, promise: null };

// export const connectToDatabase = async () => {
//   if (cached.conn) return cached.conn;

//   if(!MONGODB_URI) throw new Error('MONGODB_URI is missing');

//   cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
//     dbName: 'eventbliss',
//     bufferCommands: false,
//   })

//   cached.conn = await cached.promise;
//   console.log("mongo connect")

//   return cached.conn;
// }