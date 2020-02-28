const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchemaResultat = new Schema({
    nombresInscrit:{
        type: Number,
        required:true, 
    },
    nombresVotant:{
        type: Number,
        required:true, 
    },
    nombresAbs:{
        type: Number
        ,
        required:true, 
    },
    nombresVoix:{
        type: Array,
        required:true, 
    },
    IdCommune:{
        type: String,
        required:true, 
    },

})

mongoose.model('Resultats',SchemaResultat)