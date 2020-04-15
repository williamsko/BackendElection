const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const SchemaCoord = new Schema({
    bon:{
        type:Number,
        
    },
    Mal:{
        type:Number,
        
    }
})


const SchemaAgreObsBreaux = new Schema ({
    Bamako:{
        type: [SchemaCoord],
      
    },
    Kayes:{
        type: [SchemaCoord],
      
    },
    Koulikoro:{
        type: [SchemaCoord],
    },
    Sikasso:{
        type: [SchemaCoord],
        
    },
    Ségou:{
        type: [SchemaCoord],
        
    },
    Mopti:{
        type: [SchemaCoord],
       
    },
    Tombouctou:{
        type: [SchemaCoord],
      
    },
    Gao:{
        type: [SchemaCoord],
       
    },
    Kidal:{
        type: [SchemaCoord],
        
    },
    Taoudénit:{
        type: [SchemaCoord],
        
    },
    Ménaka:{
        type: [SchemaCoord],
      
    },
   
})

mongoose.model('AgreObsBureaux',SchemaAgreObsBreaux)