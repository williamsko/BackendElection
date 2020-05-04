
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

const SchemaObsDep = new Schema ({
    
    idBureauVote:{
        type:String,
        required:true
    },
    HeureCloture:{
        type:String,
        required:true
    },
    ElecteurVoteApres18H:{
        type:String,
        required:true
    },
  
    depouiellementSansIncident:{
        type:String,
        required:true
    },
    ImpressionGlobalScrutin:{
        type:String,
        required:true
    },
    idScrutin:{
        type:String,
        required:true
    },
    idObservateur:{
        type:String,
        required:true
    },
   
    coordGeo:{
        type: [SchemaCoord],
        
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
   
})

mongoose.model('Depouillement',SchemaObsDep)