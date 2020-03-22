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

const SchemaObsBureauVote = new Schema ({
    HeureOuvertureBureauVote:{
        type:String,
        required:true
    },
    PresenceMembreBureauDeVote:{
        type:String,
        required:true
    },
  
    MaterielAuComplet:{
        type:String,
        required:true
    },
    isoloireGarantieSecretVote:{
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
    coordGeo:{
        type: [SchemaCoord],
        
    },
   
})

mongoose.model('ObservationBureauxDeVote',SchemaObsBureauVote)