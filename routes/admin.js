const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const AdminBroMongoose = require('admin-bro-mongoose')
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

//Load User Model

const Candidat =  mongoose.model('Candidats');
const BureauVote = mongoose.model('BureauxDeVote');
const Incidents =  mongoose.model('Incidents');
const Scrutin =  mongoose.model('Scrutins');
const TypeCandidat = mongoose.model('Type Candidat');
const TypeIncident = mongoose.model('Type Incidents');
const UserAdmin = mongoose.model('userAdmin');
const Observateurs = mongoose.model('users');



const ObsVoting = mongoose.model('Deroulement Du Vote');
const ObsBureau = mongoose.model('ObsBureauxDeVote');
const ObsResultat = mongoose.model('Resultats');
const ObsCorona = mongoose.model('Corona');
const ObsPreElectorale = mongoose.model('PreElectorale');
const ObsDep = mongoose.model('Depouillement');

AdminBro.registerAdapter(AdminBroMongoose)


const Configuration = {
  name: 'Configuration Scrutin',
  icon: 'Settings',
}

const Observations = {
  name: 'Données des Observations',
  icon: 'data-table',
}

const Admin = {
  name: 'Administration',
  icon: 'user',
}

const adminBro = new AdminBro({
  //databases: [mongoose],
  //resources: [UserAdmin],

  resources: [
    { resource: Candidat, options: {parent: Configuration, listProperties: ['nom', 'PartiPolitique','couleurDuCandidat','PhotoDuCandidat'] }},
    { resource: Scrutin, options: { parent: Configuration, listProperties: ['nom', 'type','Date'] } },
    { resource: TypeCandidat, options: { parent: Configuration,listProperties: ['TitreDuType', '_id'] } },
    { resource: TypeIncident, options: { parent: Configuration } },
    { resource: BureauVote, options: { parent: Configuration, listProperties: ['nom', 'codeBureauDeVote','region','commune','cercle','_id'] } },
    { resource: Observateurs, options: { parent: Configuration,listProperties: ['name', 'phoneNumber','cin','isActif','_id'] } },

    { resource: Incidents, options: { parent: Observations,listProperties: ['titreIncident','whoStarted','commune','_id'] } },
    { resource: ObsVoting, options: { parent: Observations,listProperties: ['idBureauVote','ElecteurMontrerCarteVerification','ElecteurProblemeIdentification','CombienInscritBureauVote','CombienVotant13h']  } },
    { resource: ObsBureau, options: { parent: Observations,listProperties: ['idBureauVote','HeureOuvertureBureauVote','PresenceMembreBureauDeVote','MaterielAuComplet','isoloireGarantieSecretVote'] } },
    { resource: ObsResultat, options: { parent: Observations,listProperties: ['idBureauVote','nombresInscrit','nombresVotant','nombresBullletinsNuls','SuffragesExprimes','NbrVotesProcurations',] } },
    { resource: ObsCorona, options: { parent: Observations, listProperties: ['idBureauVote','kitDeProtectionAgent','desinfectants','affichePrevention','agentRespectDistance','desinfectionBureau','lavageMainObligatoireInOut'] } },
    { resource: ObsPreElectorale, options: { parent: Observations,listProperties: ['idBureauVote','affichageListesElectorale','SuiviMeetingQuelCandidat','DeroulementPreElectoral'] } },
    { resource: ObsDep, options: { parent: Observations ,listProperties: ['idBureauVote','HeureCloture','ElecteurVoteApres18H','depouiellementSansIncident','ImpressionGlobalScrutin'] }},

    { resource: UserAdmin, options: { parent: Admin } },



  ],

 
  


  options: {
    isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
    properties: {
      encryptedPassword: {
        isVisible: false,
      },
      password: {
        type: 'string',
        isVisible: {
          list: false, edit: true, filter: false, show: false,
        },
      },
    },
    actions: {
      new: {
        before: async (request) => {
          if(request.payload.record.password) {
            request.payload.record = {
              ...request.payload.record,
              encryptedPassword: await bcrypt.hash(request.payload.record.password, 10),
              password: undefined,
            }
          }
          return request
        },  
      },
    /*   edit: { isAccessible: canModifyUsers },
      delete: { isAccessible: canModifyUsers },
      new: { isAccessible: canModifyUsers }, */

    },

    locale: {
      translations: {
        actions: {
          new: 'Let\'s create',
        }
      }
    }



  },
  rootPath: '/admin',  

      // resources: [{ resource: users, options: {Parent: contentParent}}],
  branding: {
    companyName: 'Ajcad Election',
    logo:'https://i.ibb.co/D83RFG4/app-icon-election.png',
    favicon:'https://i.ibb.co/D83RFG4/app-icon-election.png',
    SoftwareBrothers:false,
  },

  
  
})

  
/* 
 const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  authenticate: async (email, password) => {
    const user = await UserAdmin.findOne({ email })
    if (user) {
      const matched = await bcrypt.compare(password, user.encryptedPassword)
      if (matched) {
        return user
      }
    }
    return false
  },
  cookiePassword: 'some-secret-password-used-to-secure-cookie',

})
 */

 
//Connection sans authentication 
const router = AdminBroExpress.buildRouter(adminBro)


module.exports=router;