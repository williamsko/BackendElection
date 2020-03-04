const express = require('express');
const bodyParser = require('body-parser');
const mongoose =  require ('mongoose');
const passport = require('passport');
const session = require('express-session');
const app = express();



//load all routes
const users =require('./routes/users')
const adminRouter = require('./routes/admin')
const scrutin = require('./routes/scrutin')
const formulaire = require('./routes/formulaires')
const bureau = require('./routes/bureau')
const incident = require('./routes/incident')

// passport Config : 
require ('./config/passport')(passport);

// Connecter mongoose
mongoose.connect('mongodb://localhost:27017/Malicratie', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> console.log('MongoDB connected ...'))
    .catch(err =>console.log(err));


// MiddleWares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());
app.use('/admin',adminRouter);





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

//definir le port
const port = 5000;

// ecouter le port 
app.listen(port, ()=> {
    console.log(`Server started  on port ${port}`);
})