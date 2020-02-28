const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const SchemaScrutin = new Schema  ({
    nom : {
        type:String,
        required: true
    },
    Date : {
        type:Date,
        required: true
    },
    type : {
        type:String,
        required: true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
} )

mongoose.model('Scrutins',SchemaScrutin);