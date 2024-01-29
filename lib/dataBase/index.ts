import mongoose, { Mongoose } from "mongoose"

let cached =(global as any).mongoose || {conn:null,promise:null}
const monngoDb_uri = process.env.MONGODB_URI

export const connectDatbase = async () => {
    if(cached.conn){
        return cached.conn  
    }
    if(!monngoDb_uri){
         throw new Error("MONGODB_URI is missing")
    }
    cached.promise = cached.promise || mongoose.connect(monngoDb_uri,{
        dbName:'Eventbliss',
        bufferCommands:false,
    })
    cached.conn = await cached.promise
    return cached.conn
}