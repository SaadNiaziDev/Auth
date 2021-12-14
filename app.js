const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');
app.use(express.json());


const users = [
    {
        username:'Tiny',
        password:'airlines',
    },
    {
        username:'faceless',
        password:'void',
    }
];

const initializePassport = require('./passport-config')
initializePassport(
  passport,
  username => users.find(user => user.username === username)
)


app.use(flash());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/login', (req, res)=>{
    res.send("Wrong Input")
})


app.get('/home', (req, res)=>{
    res.send("Logged In")
})

app.post('/', passport.authenticate('local',{
    successRedirect :'/home',
    failureRedirect :'login',
    failureFlash: true, 
}));



app.post('/register',  (req, res)=> {
    const user = req.body.username;
    try{
    const hashPassword = req.body.password;
    users.push({ 
        name: user,
        password: hashPassword,
    })
    //console.log(users);
    res.send('record added!');
    
}catch{
    res.sendStatus(404);
}
});

app.listen(3000);
