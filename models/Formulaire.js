const mongoose =require('mongoose')
const Schema = mongoose.Schema;

const SchemaResponses= new Schema({
    reponse:{
        type:String,
        required:true
    },
})

const SchemaQuestion= new Schema({
    numero: {
        type: Number, 
        required:true
    },
    Question: {
        type: String, 
        required:true
    },
    reponses:{
        response : [SchemaResponses],
        
    }
})
const SchemaFormulaire = new Schema ({
    TitreFormulaire:{
        type:String, 
        required:true
    },
   
    questions:{
       question: [SchemaQuestion]
    }
   
})

mongoose.model('Formulaires',SchemaFormulaire);