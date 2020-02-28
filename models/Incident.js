const mongoose =require('mongoose')
const Schema = mongoose.Schema;

const SchemaIncident = new Schema ({
    TitreIncident:{
        type:String, 
        required:true
    },
    Type: {
        type: String, 
        required:true
    },
    lieu:{
        type:String,
        required:true
    },
    coordGps:{
        type:Array,
        required:true
    },
    by: {
        type:String,
        required:true
    },
    DateHeure:{
        type:Date,
        required:true
    },
    Verified : {
        type:Boolean,
        required:true
    }
})

mongoose.model('Incidents',SchemaIncident);