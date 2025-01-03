const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({

    recipient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    type:{
        type:String,
        required:true,
        enum:["like","comment","connectionAccepted"]
    },
    relatedUser:{ //the sender
        typetype:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    realtedPost:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post",
    },
    read:{
        type:bool,
        default:false
    }


},{timestamps:true});


const Notification = mongoose.model('Notification',notificationSchema);

module.exports = Notification;