const express = require('express');
const bodyParser = require('body-parser');
const mongoose =  require ('mongoose');
const passport = require('passport');
const session = require('express-session');
const app = express();
const GVariables = require('./config/globalVariables');



//load all routes
const users =require('./routes/users')
const adminRouter = require('./routes/admin')
const scrutin = require('./routes/scrutin')
const formulaire = require('./routes/formulaires')
const bureau = require('./routes/bureau')
const incident = require('./routes/incident')
const observation = require('./routes/observations')
const agrega = require('./routes/agrega')

// passport Config : 
require ('./config/passport')(passport);

// Connecter mongoose
mongoose.connect(GVariables.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(()=> console.log('MongoDB connected ...'))
    .catch(err =>console.log(err));


// MiddleWares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());
app.use('/admin',adminRouter);


//admin bro stuff



//partie pour regler problem '' no ors'' machinn

app.disable('x-powered-by');

app.use(function(req, res, next) {
    // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Pass to next layer of middleware
  next();
  });


//index Route
app.get('/',(req,res)=>{
    res.send('Index');
})

//Use routes
app.use('/user',users)
app.use('/scrutin',scrutin)
app.use('/form',formulaire)
app.use('/bureau',bureau)
app.use('/incident',incident) 
app.use('/observations',observation) 
app.use('/agrega',agrega) 
app.use('/admin',adminRouter) 

 
//definir le port
const port = process.env.PORT || 5000;

// ecouter le port 
app.listen(port, ()=> {
    console.log(`Server started  on port ${port}`);
})