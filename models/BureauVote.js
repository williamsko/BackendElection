const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const SchemaCoord = new Schema({
    lon:{
        type:Number,
        required:true
    },
    lat:{
        type:Number,
        required:true
    }
})

const SchemaBureauVote = new Schema ({
    nom:{
        type:String,
        required:true
    },
    codeBureauDeVote:{
        type:Number,
        required:true
    },
    coordGeo:{
        type: [SchemaCoord],
        
    },
    region:{
        type:String,
        required:true
    },
    cercle:{
        type:String,
        required:true
    },
    commune:{
        type:String,
        required:true
    },
   
})

mongoose.model('BureauxDeVote',SchemaBureauVote)