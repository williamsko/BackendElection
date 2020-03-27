const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const SchemaCoord = new Schema({
    lon:{
        type:Number,
        
    },
    lat:{
        type:Number,
        
    }
})

const SchemaBureauVote = new Schema ({
    nom:{
        type:String,
        required:true
    },
    codeBureauDeVote:{
        type:String,
        required:true
    },
    coordGeo:{
        type: [SchemaCoord],
    },
    commune:{
        type:String,
        
    },
    cercle:{
        type:String,
        required:true
    },
    region:{
        type:String,
        required:true
    },
    idScrutin:{
        type:String,
      
    },
    idObservateur:{
        type:String,
        required:true
    },
   
})

mongoose.model('BureauxDeVote',SchemaBureauVote)