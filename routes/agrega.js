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

require('../models/AgreObsBureaux');
const AgreObsBureaux = mongoose.model('AgreObsBureaux')

require('../models/User');
const User = mongoose.model('users')


router.get('/obsBureaux/:region', async (req, res) => {
    let numbertotal = 0;
    let numberTotalMelange = 0;
    let totalInscrit = 0;
    let totalVotant = 0;
    let totalBulletinsNuls = 0;
    let totalSuffragesExprimes = 0;
    let totalVotesProcurations = 0;
    let Othernombre = 0;
    await BureauVote.find({ region: req.params.region }).then(results => {
        Othernombre = results

        Othernombre.map(tst => {
            //console.log("===> " + JSON.stringify(tst._id)),

            ObsResultat.findOne({ idBureauVote: tst._id }).then(bureau => {
                numberTotalMelange = numberTotalMelange + 1
                if (bureau) {
                    /*   console.log("Bureau => " + JSON.stringify(tst.nom) + "\n" +
                         " Nbre inscrit(s) : " + JSON.stringify(bureau.nombresInscrit) + "\n" +
                         " Nbre Votant(s) : " + JSON.stringify(bureau.nombresVotant) + "\n" +
                         " Bulletins Nul(s) : " + JSON.stringify(bureau.nombresBullletinsNuls) + "\n" +
                         " Surface Exprimé(s) : " + JSON.stringify(bureau.SuffragesExprimes) + "\n" +
                         " Votes par Procuration : " + JSON.stringify(bureau.NbrVotesProcurations) + "\n" + "\n"
                     ) */

                    totalInscrit = bureau.nombresInscrit + totalInscrit
                    totalVotant = bureau.nombresVotant + totalVotant
                    totalBulletinsNuls = bureau.nombresBullletinsNuls + totalBulletinsNuls
                    totalSuffragesExprimes = bureau.SuffragesExprimes + totalSuffragesExprimes
                    totalVotesProcurations = bureau.NbrVotesProcurations + totalVotesProcurations

                    numbertotal = numbertotal + 1

                    /*  console.log("Longeur TotalMelanger ==> " + numberTotalMelange)
                     console.log("Longeur nombre ==> " + Othernombre.length) */


                    ///Affichage resultat finale 


                    console.log(
                        "\n" +
                        "=======================================================================\n" +
                        " Region de : " + req.params.region + "\n" +
                        " Total Nbre  inscrit(s) : " + totalInscrit + "\n" +
                        " Total Nbre Votant(s) : " + totalVotant + "\n" +
                        " Total Bulletins Nul(s) : " + totalBulletinsNuls + "\n" +
                        " Total Surface Exprimé(s) : " + totalSuffragesExprimes + "\n" +
                        " Total Votes par Procuration : " + totalVotesProcurations + "\n" +
                        " Nombre de bureau de vote Observé : " + numbertotal + "\n" +
                        " Taux de participation : " + totalVotant / totalInscrit * 100 + " %" + "\n" +
                        "=======================================================================\n"
                    )



                } else {
                    // console.log('jai rien trouver')


                }

            })
                .catch(err => {
                    console.log(err);
                    return;
                })

        })



    })




})





router.get('/obsNotWorking', async (req, res) => {
    let numbertotal = 0;
    let numberTotalMelange = 0;
    let totalElecteurVerificationCarte = 0;
    let totalProblemeIdentification = 0;
    let totalInscrit = 0;
    let totalVotant13h = 0;
    let Othernombre = 0;
    let test = 0;
    let ObservateurFantome = []


    await User.find({ }).then(results => {
        Othernombre = results

        Othernombre.map(tst => {
            //console.log("======> " + (test = test + 1)),
          
                    
            obsBureauVote.findOne({ idObservateur: tst._id }).then(bureau => {
                numberTotalMelange = numberTotalMelange + 1

                if (bureau) {


                    /* totalInscrit = bureau.CombienInscritBureauVote + totalInscrit;
                    totalVotant13h = bureau.CombienVotant13h +  totalVotant13h ; */
                    /*    if(bureau.ElecteurMontrerCarteVerification == "OUI"){
                           totalElecteurVerificationCarte = totalElecteurVerificationCarte + 1  
                       }
                       if(bureau.ElecteurProblemeIdentification == "OUI"){
                           totalProblemeIdentification = totalProblemeIdentification + 1 ;
                       }
                        */

                    numbertotal = numbertotal + 1

                    ObservateurFantome.push(tst.name + " : " + tst.phoneNumber)
                    console.log(ObservateurFantome);

                    /*  console.log("Longeur TotalMelanger ==> " + numberTotalMelange)
                     console.log("Longeur nombre ==> " + Othernombre.length) */


                    ///Affichage resultat finale 


                    console.log(
                        "\n" +
                        "OBSERVATEUR - \n" +
                        "=======================================================================\n" +
                        " Nombre de bureaux de vote Observés: " + numbertotal + "\n"


                    )


                    /* (
                        "\n"+
                        "OBSERVATION - Déroulement Vote (National)\n" +
                        "=======================================================================\n" +
                            " Nombre de bureau de vote Observé (Ouverture Bureau): " + numberTotalMelange + "\n" +
                            " Nombre Electeur qui ont montré leur carte pour vérification : " +  totalElecteurVerificationCarte + "\n" +
                            " Nombre Electeur qui on un prolèblème à l'identification : " + totalProblemeIdentification  +" \n" +
                            " Combien de votant a 13h  : " + (totalVotant13h / totalInscrit * 100).toFixed(2) + " %"+"\n" 
                            
                       
                        ) */



                } else {

                    ObservateurFantome.push(tst.name + " : " + tst.phoneNumber)
                    console.log(ObservateurFantome);
                    console.log(ObservateurFantome.length);
                }
                setTimeout(() => {
                    res.json({ObservateurFantome});
                }, 30000);
              


            })
                .catch(err => {
                    console.log(err);
                    return;
                })

        })



    })






})


router.get('/obsDeroulement', async (req, res) => {
    let numbertotal = 0;
    let numberTotalMelange = 0;
    let totalElecteurVerificationCarte = 0;
    let totalProblemeIdentification = 0;
    let totalInscrit = 0;
    let totalVotant13h = 0;
    let Othernombre = 0;
    let test = 0;


    await User.find({}).then(results => {
        Othernombre = results

        Othernombre.map(tst => {
            //console.log("======> " + (test = test + 1)),

                ObsVoting.findOne({ idObservateur: tst._id }).then(bureau => {
                    numberTotalMelange = numberTotalMelange + 1

                    if (bureau) {


                        totalInscrit = bureau.CombienInscritBureauVote + totalInscrit;
                        totalVotant13h = bureau.CombienVotant13h + totalVotant13h;
                        /*    if(bureau.ElecteurMontrerCarteVerification == "OUI"){
                               totalElecteurVerificationCarte = totalElecteurVerificationCarte + 1  
                           }
                           if(bureau.ElecteurProblemeIdentification == "OUI"){
                               totalProblemeIdentification = totalProblemeIdentification + 1 ;
                           }
                            */

                        numbertotal = numbertotal + 1

                        /*  console.log("Longeur TotalMelanger ==> " + numberTotalMelange)
                         console.log("Longeur nombre ==> " + Othernombre.length) */


                        ///Affichage resultat finale 


                        console.log(
                            "\n" +
                            "OBSERVATION - Déroulement Vote 18h 20\n" +
                            "==================================================================\n" +
                            " Nombre de bureaux de vote Observés: " + numbertotal + "\n" +
                            " Nombre Electeurs d'inscrits : " + totalInscrit + "\n" +
                            " Nombre de votant à 18h20 : " + totalVotant13h + " \n" +
                            " Taux de participation :  : " + (totalVotant13h/totalInscrit*100).toFixed(2) + " %" + "\n"


                        )


                        /* (
                            "\n"+
                            "OBSERVATION - Déroulement Vote (National)\n" +
                            "=======================================================================\n" +
                                " Nombre de bureau de vote Observé (Ouverture Bureau): " + numberTotalMelange + "\n" +
                                " Nombre Electeur qui ont montré leur carte pour vérification : " +  totalElecteurVerificationCarte + "\n" +
                                " Nombre Electeur qui on un prolèblème à l'identification : " + totalProblemeIdentification  +" \n" +
                                " Combien de votant a 13h  : " + (totalVotant13h / totalInscrit * 100).toFixed(2) + " %"+"\n" 
                                
                           
                            ) */



                    } else {
                        // console.log('jai rien trouver')


                    }

                })
                    .catch(err => {
                        console.log(err);
                        return;
                    })

        })



    })

    setTimeout(() => {
        console.log(
            "\n" +
            "OBSERVATION - Déroulement Vote (National)\n" +
            "=======================================================================\n" +
            " Nombre de bureaux de vote Observés: " + numberTotalMelange + " " + numbertotal + "\n" +
            " Nombre d'inscrits dans les bureaux observés: " + totalInscrit + "\n" +
            " Nombre de votant à 15h : " + totalVotant13h + " \n" +
            " Taux de participation :  : " + (totalVotant13h / totalInscrit * 100).toFixed(2) + " %" + "\n"
        )
    }, 400000);




})


////Get données national RESULTAT
router.get('/obsResultat', (req, res) => {
    let numbertotal = 0;
    let numberTotalMelange = 0;
    let totalInscrit = 0;
    let totalVotant = 0;
    let totalBulletinsNuls = 0;
    let totalSuffragesExprimes = 0;
    let totalVotesProcurations = 0;
    let Othernombre = 0;



    User.find({ }).then(results => {
        Othernombre = results

        Othernombre.map(tst => {
            //console.log("===> " + JSON.stringify(tst._id)),

            ObsResultat.findOne({ idObservateur: tst._id }).then(bureau => {
                numberTotalMelange = numberTotalMelange + 1
                if (bureau) {
                    /* console.log("Bureau => " + JSON.stringify(tst.nom) + "\n" +
                        " Nbre inscrit(s) : " + JSON.stringify(bureau.nombresInscrit) + "\n" +
                        " Nbre Votant(s) : " + JSON.stringify(bureau.nombresVotant) + "\n" +
                        " Bulletins Nul(s) : " + JSON.stringify(bureau.nombresBullletinsNuls) + "\n" +
                        " Surface Exprimé(s) : " + JSON.stringify(bureau.SuffragesExprimes) + "\n" +
                        " Votes par Procuration : " + JSON.stringify(bureau.NbrVotesProcurations) + "\n" + "\n"
                    ) */

                    totalInscrit = bureau.nombresInscrit + totalInscrit
                    totalVotant = bureau.nombresVotant + totalVotant
                    totalBulletinsNuls = bureau.nombresBullletinsNuls + totalBulletinsNuls
                    totalSuffragesExprimes = bureau.SuffragesExprimes + totalSuffragesExprimes
                    totalVotesProcurations = bureau.NbrVotesProcurations + totalVotesProcurations

                    numbertotal = numbertotal + 1

                    /*  console.log("Longeur TotalMelanger ==> " + numberTotalMelange)
                     console.log("Longeur nombre ==> " + Othernombre.length) */


                    ///Affichage resultat finale 
                    console.log(
                        "\n" +
                        "OBSERVATION RESULTAT " + "\n" +
                        "=======================================================================\n" +
                        " Nombre de bureau de vote Observé (Résultat): " + numbertotal + "\n" +
                        " Total Nbre  inscrit(s) : " + totalInscrit + "\n" +
                        " Total Nbre Votant(s) : " + totalVotant + "\n" +
                        " Total Bulletins Nul(s) : " + totalBulletinsNuls + "\n" +
                        " Total Surface Exprimé(s) : " + totalSuffragesExprimes + "\n" +
                        " Taux de participation : " + (totalVotant / totalInscrit * 100).toFixed(2) + " %" + "\n" +
                        "=======================================================================\n"
                    )



                } else {
                    // console.log('jai rien trouver')


                }

                return numbertotal;

            })
                .catch(err => {
                    console.log(err);
                    return;
                })

        })



    })
            
        





    
      
                
    }
    
)



////Get données national BUREAU DE VOTE.
router.get('/obsBureauVote', async (req, res) => {
    let numbertotal = 0;
    let numberTotalMelange = 0;
    let totalAVANT8H = 0;
    let totalMaterielComplet = 0;
    let totalIsoloireGarantie = 0;

    let Othernombre = 0;
    await BureauVote.find({}).then(results => {
        Othernombre = results

        Othernombre.map(tst => {
            //console.log("===> " + JSON.stringify(Othernombre.length)),

            obsBureauVote.findOne({ idBureauVote: tst._id }).then(bureau => {
                numberTotalMelange = numberTotalMelange + 1
                if (bureau) {
                    /*   console.log("Bureau => " + JSON.stringify(tst.nom) + "\n" +
                         " Nbre inscrit(s) : " + JSON.stringify(bureau.nombresInscrit) + "\n" +
                         " Nbre Votant(s) : " + JSON.stringify(bureau.nombresVotant) + "\n" +
                         " Bulletins Nul(s) : " + JSON.stringify(bureau.nombresBullletinsNuls) + "\n" +
                         " Surface Exprimé(s) : " + JSON.stringify(bureau.SuffragesExprimes) + "\n" +
                         " Votes par Procuration : " + JSON.stringify(bureau.NbrVotesProcurations) + "\n" + "\n"
                     ) */
                    if (bureau.HeureOuvertureBureauVote == "Avant 8h15") {
                        totalAVANT8H = 1 + totalAVANT8H
                    }
                    if (bureau.MaterielAuComplet == "OUI") {
                        totalMaterielComplet = 1 + totalMaterielComplet
                    }
                    if (bureau.isoloireGarantieSecretVote == "OUI") {
                        totalIsoloireGarantie = 1 + totalIsoloireGarantie
                    }


                    numbertotal = numbertotal + 1

                    /*  console.log("Longeur TotalMelanger ==> " + numberTotalMelange)
                     console.log("Longeur nombre ==> " + Othernombre.length) */


                    ///Affichage resultat finale 
                    console.log(
                        "\n" +
                        "OBSERVATION OUVERTURE BUREAU (National)" + "\n" +
                        "=======================================================================\n" +
                        " Nombre de bureau de vote Observé (Ouverture Bureau): " + numberTotalMelange + "\n" +
                        " Pourcentage de bureau Vote ouvert avant 8h : " + (totalAVANT8H / numbertotal * 100).toFixed(2) + " % \n" +
                        " Pourcentage de bureau Vote avec du Materiel complet : " + (totalMaterielComplet / numbertotal * 100).toFixed(2) + " % \n" +
                        " Pourcentage de bureau Vote avec Isoloire qui garantie le secret du vote : " + (totalIsoloireGarantie / numbertotal * 100).toFixed(2) + " %\n" +
                        "=======================================================================\n"
                    )





                } else {
                    // console.log('jai rien trouver')


                }

            })

                .catch(err => {
                    console.log(err);
                    return;
                })

        })



    })

    setTimeout(() => {
        console.log(
            "\n" +
            "OBSERVATION OUVERTURE BUREAU (National)" + "\n" +
            "=======================================================================\n" +
            " Nombre de bureau de vote Observé (Ouverture Bureau): " + numberTotalMelange + "\n" +
            " Pourcentage de bureau Vote ouvert avant 8h : " + (totalAVANT8H / numbertotal * 100).toFixed(2) + " % \n" +
            " Pourcentage de bureau Vote avec du Materiel complet : " + (totalMaterielComplet / numbertotal * 100).toFixed(2) + " % \n" +
            " Pourcentage de bureau Vote avec Isoloire qui garantie le secret du vote : " + (totalIsoloireGarantie / numbertotal * 100).toFixed(2) + " %\n" +
            "=======================================================================\n"
        )
    }, 50000);


})




////Get données national COVID19 .
router.get('/ObsCorona', async (req, res) => {
    let nombreBureauVote = 0;
    let numberTotalMelange = 0;

    let totaldesinfectés = 0;
    let totallavageMain = 0;


    let Othernombre = 0;
    await BureauVote.find({}).then(results => {
        Othernombre = results

        Othernombre.map(tst => {
            //console.log("===> " + JSON.stringify(tst._id)),

            ObsCorona.findOne({ idBureauVote: tst._id }).then(bureau => {
                numberTotalMelange = numberTotalMelange + 1
                if (bureau) {
                    console.log(bureau.desinfectants)
                    console.log(bureau.lavageMainObligatoireInOut)
                    /*   console.log("Bureau => " + JSON.stringify(tst.nom) + "\n" +
                         " Nbre inscrit(s) : " + JSON.stringify(bureau.nombresInscrit) + "\n" +
                         " Nbre Votant(s) : " + JSON.stringify(bureau.nombresVotant) + "\n" +
                         " Bulletins Nul(s) : " + JSON.stringify(bureau.nombresBullletinsNuls) + "\n" +
                         " Surface Exprimé(s) : " + JSON.stringify(bureau.SuffragesExprimes) + "\n" +
                         " Votes par Procuration : " + JSON.stringify(bureau.NbrVotesProcurations) + "\n" + "\n"
                     ) */
                    if (bureau.desinfectants == "OUI") {
                        totaldesinfectés = totaldesinfectés + 1
                    }
                    if (bureau.lavageMainObligatoireInOut == "OUI") {
                        totallavageMain = totallavageMain + 1
                    }

                    nombreBureauVote = nombreBureauVote + 1

                    /*  console.log("Longeur TotalMelanger ==> " + numberTotalMelange)
                     console.log("Longeur nombre ==> " + Othernombre.length) */


                    ///Affichage resultat finale 


                    console.log(
                        "\n" +
                        "OBSERVATION - DISPOSITIF COVID-19 (National)\n" +
                        "=======================================================================\n" +
                        " Nombre de bureau de vote Observé (Ouverture Bureau): " + numberTotalMelange + "\n" +
                        " Pourcentage de bureau de vote OUI désinfecté : " + (totaldesinfectés / nombreBureauVote * 100).toFixed(2) + " % \n" +
                        " Pourcentage de bureau de vote NON désinfecté : " + (100 - (totaldesinfectés / nombreBureauVote * 100)).toFixed(2) + " % \n" +
                        " Pourcentage de bureau LAVAGE DES MAINS est obligatoire à l’entrée principale  : " + (totallavageMain / nombreBureauVote * 100).toFixed(2) + " % \n" +
                        " Pourcentage de bureau PAS DE LAVAGE DES MAINS est obligatoire à l’entrée principale  : " + (100 - (totallavageMain / nombreBureauVote * 100)).toFixed(2) + " % \n" +

                        "=======================================================================\n"
                    )



                } else {
                    // console.log('jai rien trouver')


                }

            })
                .catch(err => {
                    console.log(err);
                    return;
                })

        })



    })


})




////Get données national CLOTURE ET DEPOUILLEMENT .
router.get('/ObsDep', async (req, res) => {
    let nombreBureauVote = 0;
    let numberTotalMelange = 0;

    let totalElecteurvote18H = 0;
    let totalHeureClotureAvant18H = 0;
    let totalTresSatisfait = 0;
    let totalsatisfait = 0;
    let totalAssezSatisfait = 0;
    let totalPasAssezSatisfait = 0;

    let Othernombre = 0;


    await BureauVote.find({}).then(results => {
        Othernombre = results

        Othernombre.map(tst => {
            //console.log("===> " + JSON.stringify(tst._id)),

            ObsDep.findOne({ idBureauVote: tst._id }).then(bureau => {
                numberTotalMelange = numberTotalMelange + 1
                if (bureau) {
                    console.log(bureau.desinfectants)
                    console.log(bureau.lavageMainObligatoireInOut)
                    /*   console.log("Bureau => " + JSON.stringify(tst.nom) + "\n" +
                         " Nbre inscrit(s) : " + JSON.stringify(bureau.nombresInscrit) + "\n" +
                         " Nbre Votant(s) : " + JSON.stringify(bureau.nombresVotant) + "\n" +
                         " Bulletins Nul(s) : " + JSON.stringify(bureau.nombresBullletinsNuls) + "\n" +
                         " Surface Exprimé(s) : " + JSON.stringify(bureau.SuffragesExprimes) + "\n" +
                         " Votes par Procuration : " + JSON.stringify(bureau.NbrVotesProcurations) + "\n" + "\n"
                     ) */
                    if (bureau.ElecteurVoteApres18H == "OUI") {
                        totalElecteurvote18H = totalElecteurvote18H + 1
                    }
                    if (bureau.HeureCloture == "À 18h00" || bureau.HeureCloture == "Avant 18h00") {
                        totalHeureClotureAvant18H = totalHeureClotureAvant18H + 1
                    }
                    if (bureau.ImpressionGlobalScrutin == "Très satisfaisante") {
                        totalTresSatisfait = totalTresSatisfait + 1
                    }
                    if (bureau.ImpressionGlobalScrutin == "Satisfaisante") {
                        totalsatisfait = totalsatisfait + 1
                    }
                    if (bureau.ImpressionGlobalScrutin == "Assez satisfaisante") {
                        totalAssezSatisfait = totalAssezSatisfait + 1
                    }


                    nombreBureauVote = nombreBureauVote + 1

                    /*  console.log("Longeur TotalMelanger ==> " + numberTotalMelange)
                     console.log("Longeur nombre ==> " + Othernombre.length) */


                    ///Affichage resultat finale 


                    setTimeout(() => {
                        console.log(
                            "\n" +
                            "OBSERVATION -  CLOTURE ET DEPOUILLEMENT (National)\n" +
                            "=======================================================================\n" +
                            " Nombre de bureau de vote Observé (Ouverture Bureau): " + numberTotalMelange + "\n" +
                            " Pourcentage de bureau de vote avec des Electeurs qui ont voté aprés 18H : " + (totalElecteurvote18H / nombreBureauVote * 100).toFixed(2) + " % \n" +
                            " Pourcentage de bureau fermé avant ou à 18H : " + (100 - (totalHeureClotureAvant18H / nombreBureauVote * 100)).toFixed(2) + " % \n" +
                            " Pourcentage de niveau de satisfaction ==> Trés Satisfaisante: " + (totalTresSatisfait / nombreBureauVote * 100).toFixed(2) + " % \n" +
                            " Pourcentage de niveau de satisfaction ==> Satisfaisante: " + (totalsatisfait / nombreBureauVote * 100).toFixed(2) + " % \n" +
                            " Pourcentage de niveau de satisfaction ==> Assez Satisfaisante: " + (totalAssezSatisfait / nombreBureauVote * 100).toFixed(2) + " % \n" +
                            " Pourcentage de niveau de satisfaction ==> Pas Satisfaisante: " + (100 - ((totalAssezSatisfait + totalsatisfait + totalTresSatisfait) / nombreBureauVote * 100)).toFixed(2) + " % \n" +

                            "=======================================================================\n"
                        )
                    }, 50000);



                } else {
                    // console.log('jai rien trouver')


                }

            })
                .catch(err => {
                    console.log(err);
                    return;
                })

        })



    })







})






//// GET Données tous Bureaux de vote ////////

router.get('/DataBureau/:idScrutin', (req, res) => {
    //console.log('c ça que jai recu comme ID: ' + req.params.idScrutin)
    BureauVote.find({ idScrutin: req.params.idScrutin })
        .then(bureaux => {
            if (bureaux) {
                res.send(bureaux);
                //console.log(JSON.stringify(form))
            } else {
                res.send('jai rien trouver')
            }
        })
})







module.exports = router;