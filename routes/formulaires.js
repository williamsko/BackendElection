
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//loading Formulaire model
require('../models/Formulaire');
const Formulaire = mongoose.model('Formulaires');


///////// get formulaire router
router.get('/:formName',(req,res)=>{
    console.log('c ça que jai recu comme ID: ' + req.params.formName)
    Formulaire.findOne({ TitreFormulaire: req.params.formName}, { TitreFormulaire: 1, _id:0, questions:1 })
    .then(form => {
        if (form){
            res.send(form);
           console.log(JSON.stringify(form.TitreFormulaire))
        }else{
            res.send('jai rien trouver')
        }
    })
})








module.exports = router;