const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport =require('passport');



//Load User Model
require('../models/User');
require('../models/Candidat');
require('../models/BureauVote');
require('../models/Incident');
require('../models/Scrutin');
require('../models/Resultat');
require('../models/Formulaire');
require('../models/TypeCandidat');
require('../models/TypeIncident');

const User = mongoose.model('users');

/////////////////Register route ////////////////////
router.post('/register',(req,res)=>{
    let errors =[ status={}, allErrors={}];
   
    //check sur le Nom
    if(req.body.nom.length < 4){
        errors.push({labelName:"nom",text :'le nom entré est trop court'})
        
    }
    
    //check si le mot de passe is not short
      if(req.body.pwd.length < 4){
        errors.push({labelName:"pwdAll",text : "password too short"})
        
        
    }

    //check si les mot de passe / mot de passe confirmé sont parail 
    if(req.body.pwd != req.body.pwd2){
        errors.push({labelName:"pwd2", text : "Passwort dont match"})
    }

    //check si le numero de Tel est bon !!
    if(req.body.tel.length < 5){
        errors.push({labelName:"tel",text : "Numero de Telphone invalide"})
    }else if (isNaN(req.body.tel)){
        errors.push({labelName:"tel", text : "Numero de Telphone invalide (pas de lettre)"})
    }
    
    //check si le numero de CIN est bon !!
    if(isNaN(req.body.cin)){
        errors.push({labelName:"cin", text : "Numero de CIN invalide"})
    }

  //afficher l'erreur ou enregistrer le user 
    if (errors.length > 2){
        errors[0]["status"]=500;
        errors.push({data : req.body})
        res.json(errors)
      
        console.log('lerreur est la !! ===>' + JSON.stringify(errors))
    }else {
       // console.log(req.body)

       //Check s'il le numero de Tel n'existe pas deja : 
       User.findOne({phoneNumber: req.body.tel})
       .then(user=>{
           if(user){
               console.log('le numero existe déja !!!')
               errors[0]["status"]=400;
               console.log("contenu de error ===>  " + JSON.stringify(errors))
               errors.push({data : req.body})
               res.json(errors)
           }else{
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
                            console.log(user);
                            errors[0]["status"] = 200;
                            res.json(errors);
                        })
                        .catch(err => {
                            console.log(err);
                            return;
                        })
                       
                    });
                });



           }
       })
    }
 
})

///////////////// LOGIN ////////////////////

router.post('/login', (req, res, next) => {
   User.findOne({phoneNumber: req.body.tel})
   .then(user => {
       if(user){
          bcrypt.compare(req.body.pwd, user.pwd).then((response) => {
            if(response == true){ 
                console.log('Utilisateur existe et le mot de passe est bON');
                res.status(200).send(user)
            }else{
                console.log('Utilisateur existe et le mot de passe est érronée')
                res.json({status:403})
            }
        });
       }else{
        console.log('utilisateur nexsite pas')
        res.status(404).send({status:404})
       }
   })
  });


module.exports = router;