const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const SchemaBureauVote = new Schema ({
    nom:{
        type:String,
        required:true
    },
    numeroBureau:{
        type:Number,
        required:true
    },
    coordGeo:{
        type:Array,
        required:true
    },
    commune:{
        type:String,
        required:true
    },
   
})

mongoose.model('Bureaux de vote',SchemaBureauVote)