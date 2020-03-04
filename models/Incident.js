const mongoose =require('mongoose')
const Schema = mongoose.Schema;



const SchemaGpscoord = new Schema({
    lon:{
        type:Number,
        required:true
    },
    lat:{
        type:Number,
        required:true
    }
})





const SchemaIncident = new Schema ({
    titreIncident:{
        type:String, 
        required:true
    },
    type: {
        type: {type: Schema.Types.ObjectId, ref:'Type Incidents'}, 
    },
    whoStarted: {
        type:String, 
        required:true
    },
    commune:{
        type:String,
        required:true
    },
    coordGps:{
        type:[SchemaGpscoord],
    },
    by: {
        type:String,
        required:true
    },
    periode:{
        type:String,
        required:true
    },
    dateHeure:{
        type:Date,
        default:Date.now,
    },
    idScrutin:{
        type:String,
        required:true
    },
    verified : {
        type:Boolean,
        
    }
})

mongoose.model('Incidents',SchemaIncident);