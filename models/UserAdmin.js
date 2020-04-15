const mongoose = require('mongoose');




const Schema =  mongoose.Schema;

// Creatin SchemaAdmin

const SchemaUserAdmin= new Schema ({
    email: { 
        type: String,
        required: true 
    },
    encryptedPassword: {
        type: String,
        required: true 
    },
    role: {
        type: String,
        enum: ['admin', 'restricted'],
        required: true },
       
     
});



mongoose.model('userAdmin',SchemaUserAdmin);
 