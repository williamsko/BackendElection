const mongoose =require('mongoose')
const Schema = mongoose.Schema;



const schemaCandidatType = new Schema({
    TitreDuType:{
        type:String,
        required:true
    }
})

mongoose.model('Type Candidat', schemaCandidatType)