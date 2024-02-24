import {  Schema, model, models ,Document} from "mongoose";

export interface IEvent extends Document {
    _id: string;
    title: string;
    description?: string;
    location?: string;
    createAt: Date;
    imageUrl: string;
    startDateTime: Date;
    endDateTime: Date;
    price: string;
    isFree: boolean;
    Url?: string;
    category: {_id:string,name:string} // Assuming the type for category is a string, you might need to adjust it based on your actual category schema.
    organizer:{_id:string,firstName:string,lastName:string}; // Assuming the type for organizer is a string, you might need to adjust it based on your actual User schema.
}

const EventSchema = new Schema({
    title:{type:String,require:true},
    description:{type:String},
    location:{type:String},
    createAt:{type:Date ,default:Date.now},
    imageUrl:{type:String,require:true},
    startDateTime:{type:Date,default:Date.now},
    endDateTime:{type:Date,default:Date.now},
    price:{type:String},
    isFree:{type:Boolean,default:false},
    url:{type:String},
    category:{type:Schema.Types.ObjectId ,ref:'category'},
    organizer:{type:Schema.Types.ObjectId,ref:'User'},
})

const Event = models.Event || model('Event' ,EventSchema)

export default  Event