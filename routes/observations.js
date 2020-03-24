const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

///load models
require('../models/ObsBureauxDeVote');
const obsBureauVote = mongoose.model('ObsBureauxDeVote')

require('../models/ObsPreElectorale');
const ObsPreElectorale = mongoose.model('PreElectorale')

require('../models/ObsVoting');
const ObsVoting = mongoose.model('Deroulement Du Vote')

require('../models/ObsDepouillement');
const ObsDep = mongoose.model('Depouillement')

require('../models/ObsResultat');
const ObsResultat = mongoose.model('Resultats')


////// Observation d'un bureau de vote route \\\\\\\\\
router.post('/NewObsBureau', (req, res) => {
    const newObsBureau = new obsBureauVote({
        HeureOuvertureBureauVote: req.body.heureOverture,
        PresenceMembreBureauDeVote: req.body.presenceMembre,
        MaterielAuComplet: req.body.materielComplet,
        isoloireGarantieSecretVote: req.body.isoloireGarantie,
        idScrutin:req.body.idScrutin,
        idBureauVote:req.body.idBureauVote,
        coordGeo:req.body.coord
    })
    newObsBureau.save()
        .then(bureau => {
            res.send({status:200,data: bureau})
        })
        .catch(err => {
            console.log(err);
            res.send({status:300, data: req.body})
            return;
        })
})


////// Observation préElectorale route \\\\\\\\\
router.post('/NewObsPreelectoral', (req, res) => {
    const newObsPreElec = new ObsPreElectorale({
        affichageListesElectorale: req.body.listAffiche,
        SuiviMeetingQuelCandidat: req.body.candidat,
        DeroulementPreElectoral: req.body.deroulement,
        idScrutin:req.body.idScrutin,
        coordGeo:req.body.coord
    })
    console.log(req.body)
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


///// Observation Depouillement du vote route \\\\\\\\\
router.post('/NewObsDep', (req, res) => {
    const newObsDep = new ObsDep({
        HeureCloture: req.body.heureCloture,
        ElecteurVoteApres18H: req.body.electeurVoteApres18H,
        depouiellementSansIncident: req.body.depouiellementSansIncident,
        ImpressionGlobalScrutin: req.body.ImpressionGlobalScrutin,
        idScrutin: req.body.idScrutin,
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



///// remonté resultat du Bureau vote route \\\\\\\\\
router.post('/NewResult', (req, res) => {
    const newResult = new ObsResultat({
        nombresInscrit: req.body.nbrInscrit,
        nombresVotant: req.body.nbrVotant,
        nombresBullletinsNuls: req.body.bulletinsNuls,
        SuffragesExprimes: req.body.SuffragesExprimes,
        NbrVotesProcurations: req.body.NbrVotesProcurations,
        voixCandidats: req.body.voixCandidats,
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



module.exports = router;