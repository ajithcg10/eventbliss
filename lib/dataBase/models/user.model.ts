import { Schema, model, models } from "mongoose";

const UseSchema = new Schema({
    clerkId:{type:String},
    email:{type:String},
    userName:{type:String,},
    firstName:{type:String, },
    lastName:{type:String, },
    photo:{type:String}
})
const User = models.User || model('User',UseSchema); 
export default User