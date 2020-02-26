const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


//Load User Model
require('../models/User');
const User = mongoose.model('users');

//Register route 
router.post('/register',(req,res)=>{
    let errors =[];
   
    //check si le mot de passe is not short
      if(req.body.pwd.length < 4){
        errors.push({text : "password too short"})
    }

    //check si les mot de passe / mot de passe confirmé sont parail 
    if(req.body.pwd != req.body.pwd2){
        errors.push({text : "Passwort dont match"})
    }

    //check si le numero de Tel est bon !!
    if(req.body.tel.length < 5){
        errors.push({text : "Numero de Telphone invalide"})
    }else if (isNaN(req.body.tel)){
        errors.push({text : "Numero de Telphone invalide (pas de lettre)"})
    }
    
    //check si le numero de CIN est bon !!
    if(isNaN(req.body.cin)){
        errors.push({text : "Numero de CIN invalide"})
    }

  //afficher l'erreur ou enregistrer le user 
    if (errors.length > 0){
        res.send(errors)
        console.log('lerreur est la !! ===>' + JSON.stringify(errors))
    }else {
        console.log(req.body)
        const newUser = new User({
            name: req.body.nom,
            phoneNumber: req.body.tel,
            cin: req.body.cin, 
            pwd: req.body.pwd, 
             })
            
            bcrypt.genSalt(10, (err, salt)=> {
                bcrypt.hash(newUser.pwd, salt, (err, hash)=> {
                    if (err) throw err;
                    newUser.pwd = hash;
                    newUser.save()
                    .then(user => {
                        console.log('les données du user sont => : ' + JSON.stringify(user));
                        res.send('success');
                    })
                    .catch(err => {
                        console.log(err);
                        return;
                    })
                   
                });
            });
        
        
       

    }



   
})


//Login route
router.post('/login',(req,res)=>{
    console.log(req.body);
    res.send('yeah')
})


module.exports = router;