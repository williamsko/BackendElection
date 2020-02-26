const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

// Creatin Schema

const SchemaUser= new Schema ({
    name:{
        type:String,
        required:true
    } ,
     phoneNumber:{
        type:Number,
        required:true
    },
    cin:{
        type:Number,
        required:true
    },
    pwd:{
        type:String,
        required:true
    },

    createdAt:{
        type:Date,
        default:Date.now 
    }
     
});

mongoose.model('users',SchemaUser);
 