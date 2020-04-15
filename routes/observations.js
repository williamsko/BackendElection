const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

///load models
require('../models/ObsBureauxDeVote');
const obsBureauVote = mongoose.model('ObsBureauxDeVote')

require('../models/BureauVote');
const BureauVote = mongoose.model('BureauxDeVote')

require('../models/ObsPreElectorale');
const ObsPreElectorale = mongoose.model('PreElectorale')

require('../models/ObsVoting');
const ObsVoting = mongoose.model('Deroulement Du Vote')

require('../models/ObsDepouillement');
const ObsDep = mongoose.model('Depouillement')

require('../models/ObsResultat');
const ObsResultat = mongoose.model('Resultats')

require('../models/ObsCorona');
const ObsCorona = mongoose.model('Corona')


////// Observation d'un bureau de vote route \\\\\\\\\
router.post('/NewObsBureau', (req, res) => {
    BureauVote.findByIdAndUpdate({ _id: req.body.idBureauVote }, {coordGeo :req.body.coord }, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log('Je nai trouver shitt =>' + JSON.stringify(result));
        }
      })
    const newObsBureau = new obsBureauVote({
        HeureOuvertureBureauVote: req.body.heureOverture,
        PresenceMembreBureauDeVote: req.body.presenceMembre,
        MaterielAuComplet: req.body.materielComplet,
        isoloireGarantieSecretVote: req.body.isoloireGarantie,
        idScrutin:req.body.idScrutin,
        idObservateur:req.body.idObs,
        idBureauVote:req.body.idBureauVote,
        coordGeo:req.body.coord
    })
    newObsBureau.save()
        .then(bureau => {
            //console.log('Bureau de vote rajouté !!!!!' + bureau)
            res.send({status:200,data: bureau})
        })
        .catch(err => {
            console.log(err);
            res.send({status:300, data: req.body})
            return;
        })
})

//// GET Données tous Bureaux de vote ////////

router.get('/DataBureau/:idScrutin',(req,res)=>{
    //console.log('c ça que jai recu comme ID: ' + req.params.idScrutin)
    BureauVote.find({ idScrutin: req.params.idScrutin})
    .then(bureaux => {
        if (bureaux){
            res.send(bureaux);
           //console.log(JSON.stringify(form))
        }else{
            res.send('jai rien trouver')
        }
    })
})

//// GET Données un obs Bureau de vote ////////

router.get('/ObsDataBureau/:idBureauVote',(req,res)=>{
    //console.log('c ça que jai recu comme ID: ' + req.params.idBureauVote)
    obsBureauVote.findOne({ idBureauVote: req.params.idBureauVote})
    .then(obsBureau => {
        if (obsBureau){
            res.send(obsBureau);
           //console.log(JSON.stringify(form))
        }else{
            res.send('jai rien trouver')
        }
    })
})





////// Observation préElectorale route \\\\\\\\\
router.post('/NewObsPreelectoral', (req, res) => {
    const newObsPreElec = new ObsPreElectorale({
        affichageListesElectorale: req.body.listAffiche,
        SuiviMeetingQuelCandidat: req.body.candidat,
        DeroulementPreElectoral: req.body.deroulement,
        idScrutin:req.body.idScrutin,
        idBureauVote : req.body.idBureauVote,
        idObservateur:req.body.idObs,
        coordGeo:req.body.coord
    })
    
    newObsPreElec.save()
        .then(preElec => {
            res.send({status:200,data: preElec})
        })
        .catch(err => {
            console.log(err);
            res.send({status:300, data: req.body})
            return;
        })
})






////// Observation Deroulement vote ( volting ) route \\\\\\\\\
router.post('/NewObsVoting', (req, res) => {
    const newObsVoting = new ObsVoting({
        ElecteurMontrerCarteVerification: req.body.electeurVerification,
        ElecteurProblemeIdentification: req.body.electeurIdentification,
        CombienInscritBureauVote: req.body.nbrInscrit,
        CombienVotant13h:req.body.nbrVotant13h,
        idScrutin:req.body.idScrutin,
        idBureauVote:req.body.idBureauVote,
        idObservateur: req.body.idObs,
        coordGeo:req.body.coord
    })
    newObsVoting.save()
        .then(obs => {
            res.send({status:200,data: obs})
        })
        .catch(err => {
            console.log(err);
            res.send({status:300, data: req.body})
            return;
        })
})

//// GET Données Deroullement du vote ds un Bureau de vote ////////

router.get('/DataVoting/:idBureauVote',(req,res)=>{
    //console.log('c ça que jai recu comme ID: ' + req.params.idBureauVote)
    ObsVoting.findOne({ idBureauVote: req.params.idBureauVote})
    .then(voting => {
        if (voting){
            res.send(voting);
           console.log(JSON.stringify(voting))
        }else{
            res.send('jai rien trouver')
        }
    })
})













///// Observation Depouillement du vote route \\\\\\\\\
router.post('/NewObsDep', (req, res) => {
    const newObsDep = new ObsDep({
        HeureCloture: req.body.heureCloture,
        ElecteurVoteApres18H: req.body.electeurVoteApres18H,
        depouiellementSansIncident: req.body.depouiellementSansIncident,
        ImpressionGlobalScrutin: req.body.ImpressionGlobalScrutin,
        idScrutin: req.body.idScrutin,
        idObservateur:req.body.idObs,
        idBureauVote: req.body.idBureauVote,
        coordGeo:req.body.coord
    })
    newObsDep.save()
        .then(dep => {
            res.send({status:200,data: dep})
            
        })
        .catch(err => {
            console.log(err);
            res.send({status:300, data: req.body})
            return;
        })
})


//// Donnée de cloture et depouillement d'un bureau de vote
router.get('/DataObsDep/:idBureauVote',(req,res)=>{
    //console.log('c ça que jai recu comme ID: ' + req.params.idBureauVote)
    ObsDep.findOne({ idBureauVote: req.params.idBureauVote})
    .then(dep => {
        if (dep){
            res.send(dep);
           //console.log(JSON.stringify(dep))
        }else{
            res.send('jai rien trouver')
        }
    })
})










///// remonté resultat du Bureau vote route \\\\\\\\\
router.post('/NewResult', (req, res) => {
    const newResult = new ObsResultat({
        nombresInscrit: req.body.nbrInscrit,
        nombresVotant: req.body.nbrVotant,
        nombresBullletinsNuls: req.body.bulletinsNuls,
        SuffragesExprimes: req.body.SuffragesExprimes,
        NbrVotesProcurations: req.body.NbrVotesProcurations,
        
        idObservateur:req.body.idObs,
        idScrutin: req.body.idScrutin,
        idBureauVote: req.body.idBureauVote,
    })
    newResult.save()
        .then(result => {
            res.send({status:200,data: result})
        })
        .catch(err => {
            console.log(err);
            res.send({status:300, data: req.body})
            return;
        })
})



///// Observation Corona route \\\\\\\\\
router.post('/NewObsCorona', (req, res) => {
    const newObsCorona = new ObsCorona({
        kitDeProtectionAgent: req.body.kitDeProtectionAgent,
        desinfectants: req.body.desinfectants,
        affichePrevention: req.body.affichePrevention,
        agentRespectDistance: req.body.agentRespectDistance,
        desinfectionBureau:req.body.desinfectionBureau,
        lavageMainObligatoireInOut:req.body.lavageMain,
        idScrutin: req.body.idScrutin,
        idObservateur:req.body.idObs,
        idBureauVote: req.body.idBureauVote,
        coordGeo:req.body.coord
    })
    newObsCorona.save()
        .then(dep => {
            res.send({status:200,data: dep})
        })
        .catch(err => {
            console.log(err);
            res.send({status:300, data: req.body})
            return;
        })
})

//// Donnée Observation Corona d'un bureau de vote
router.get('/DataObsCorona/:idBureauVote',(req,res)=>{
    //console.log('c ça que jai recu comme ID: ' + req.params.idBureauVote)
    ObsCorona.findOne({ idBureauVote: req.params.idBureauVote})
    .then(coro => {
        if (coro){
            res.send(coro);
           //console.log(JSON.stringify(dep))
        }else{
            res.send('jai rien trouver')
        }
    })
})




module.exports = router;