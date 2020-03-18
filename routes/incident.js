
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





module.exports = router;


