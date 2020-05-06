
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

///load model 
require('../models/BureauVote');
const Bureau = mongoose.model('BureauxDeVote')

////// creation d'un bureau de vote route \\\\\\\\\
router.post('/create', (req, res) => {

    const newBureau = new Bureau({
        nom: req.body.nom,
        codeBureauDeVote: req.body.code,
        region:req.body.region,
        cercle:req.body.cercle,
        commune: req.body.commune,
        idObservateur:req.body.idObs,
        idScrutin: req.body.idScrutin,
        coordGeo: req.body.coord,
    })
        Bureau.findOneAndRemove({ idObservateur: req.body.idObs},function(err, result) {
            if (err) {
              console.log(err);
            } else {
                newBureau.save()
                .then(bureau => {
                res.send({status:200,data: bureau})
                })
                .catch(err => {
                console.log(err);
                res.send({status:300, data: req.body})
                return;
        })
            }
        })
})





module.exports = router;


