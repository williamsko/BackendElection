const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const SchemaCandidat = new Schema({
    nom:{
        type:String,
        required:true, 
    },
    typeCandidat:{
        type:String,
        required:true, 
    },
    PartiPolitique:{
        type:String,
        required:true, 
    },
    PhotoDuCandidat:{
        type:String,
        required:true, 
    },
    couleurDuCandidat:{
        type:String,
        required:true, 
    }
})

mongoose.model('Candidats',SchemaCandidat)