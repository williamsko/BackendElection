const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const SchemaResultatsCandidat= new Schema({
    candidatId:{
        type:String,
        required:true
    },
    candidatVoix:{
        type:Number,
        required:true
    },
})




const SchemaResultat = new Schema({
    idBureauVote:{
        type:String,
        required:true
    },
    nombresInscrit:{
        type: Number,
        required:true, 
    },
    nombresVotant:{
        type: Number,
        required:true, 
    },
    nombresBullletinsNuls:{
        type: Number,
        required:true, 
    },
    SuffragesExprimes:{
        type: Number,
        required:true, 
    },
    NbrVotesProcurations:{
        type: Number,
        required:true, 
    },
    voixCandidats:{
        type:[SchemaResultatsCandidat]
    },
    idScrutin:{
        type:String,
        required:true,
    },
    idObservateur:{
        type:String,
        required:true
    },
    
    createdAt:{
        type:Date,
        default:Date.now
    },



})

mongoose.model('Resultats',SchemaResultat)