
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

const SchemaObsVoting = new Schema ({
    idBureauVote:{
        type:String,
        required:true
    },
    ElecteurMontrerCarteVerification:{
        type:String,
        required:true
    },
    ElecteurProblemeIdentification:{
        type:String,
        required:true
    },
  
    CombienInscritBureauVote:{
        type:Number,
        required:true
    },
    CombienVotant13h:{
        type:Number,
        
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

mongoose.model('Deroulement Du Vote',SchemaObsVoting)