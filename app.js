const express = require('express');
const bodyParser = require('body-parser');
const mongoose =  require ('mongoose');

const app = express();


//load all routes
const users =require('./routes/users')

// Connecter mongoose
mongoose.connect('mongodb://localhost:27017/Malicratie', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> console.log('MongoDB connected ...'))
    .catch(err =>console.log(err));


// Body parser middleWare
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




//index Route
app.get('/',(req,res)=>{
    res.send('Index');
})

//Use routes
app.use('/user',users)


//definir le port
const port = 5000;

// ecouter le port 
app.listen(port, ()=> {
    console.log(`Server started  on port ${port}`);
})