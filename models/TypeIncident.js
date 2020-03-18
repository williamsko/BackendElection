
const mongoose =require('mongoose')
const Schema = mongoose.Schema;



const SchemaTypeIncident = new Schema({
    name:{
        type:String,
        required:true
    }
})



mongoose.model('Type Incidents',SchemaTypeIncident);