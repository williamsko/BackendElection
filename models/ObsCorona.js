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

const SchemaObsCorona = new Schema ({
    kitDeProtectionAgent:{
        type:String,
        required:true
    },
    desinfectants:{
        type:String,
        required:true
    },
  
    affichePrevention:{
        type:String,
        required:true
    },
    agentRespectDistance:{
        type:String,
        required:true
    },
    desinfectionBureau:{
        type:String,
        required:true
    },
    lavageMainObligatoireInOut:{
        type:String,
        required:true
    },
    idScrutin:{
        type:String,
        required:true
    },
    idBureauVote:{
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

mongoose.model('Corona',SchemaObsCorona)