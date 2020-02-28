
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//loading scrutin model
require('../models/Scrutin');
const Scrutin = mongoose.model('Scrutins');


////// load scrutin router

router.post('/load',(req,res)=>{
    //voir si l'id donné existe
    console.log('lid donnée est la ====> ' + req.body.id )
    Scrutin.findOne({ _id: req.body.id })
    .then(scrutin => {
        if (scrutin){
            console.log('its all good im send ===>'+ scrutin)
            res.send(scrutin)
        }else{
            console.log('=============> rien trouvé')
            res.send({"status":500,"text":"l\'id errone"})
        }
    })
    .catch((error)=> {
        console.log(error)
        res.send({status:500,text:"l\'id errone"})
    })
   
})





module.exports = router;