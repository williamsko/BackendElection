
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

///load model 
require('../models/Incident');
const Incident = mongoose.model('Incidents')

////// creation d'un bureau de vote route \\\\\\\\\
router.post('/new', (req, res) => {
    const newIncident = new Incident({
        titreIncident: req.body.titre,
        type: req.body.type,
        whoStarted: req.body.whoStarted,
        commune: req.body.commune,
        coordGps: req.body.coord,
        by: req.body.by,
        periode: req.body.periode,
        idScrutin: req.body.idScrutin
    })
    newIncident.save()
        .then(incident => {
            res.send(incident)
        })
        .catch(err => {
            console.log(err);
            res.send(req.body)
            return;
        })
})


//// GET Données tous les incidents ////////

router.get('/DataIncident',(req,res)=>{
    //console.log('c ça que jai recu comme ID: ' + req.params.idScrutin)
    Incident.find({ })
    .then(incidents => {
        if (incidents){
            res.send(incidents);
           //console.log(JSON.stringify(form))
        }else{
            res.send('jai rien trouver')
        }
    })
})





module.exports = router;


