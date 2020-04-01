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

const SchemaPreElectorale = new Schema ({
    idBureauVote:{
        type:String,
        required:true
    },
    affichageListesElectorale:{
        type:String,
        required:true
    },
    SuiviMeetingQuelCandidat:{
        type:String,
        required:true
    },
    coordGeo:{
        type: [SchemaCoord],
        
    },
    DeroulementPreElectoral:{
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
    createdAt:{
        type:Date,
        default:Date.now
    },
   
})

mongoose.model('PreElectorale',SchemaPreElectorale)