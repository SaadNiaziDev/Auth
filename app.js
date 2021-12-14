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

const initializePassport = require('./passport-config');
initializePassport(passport,username=>{
    return users.find(user=>user.username===username)
});


app.use(flash());
app.use(session({
    secret: 'ABCDEF',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/login', (req, res)=>{
    res.sendFile(path.join(__dirname+'/login.html'))
})


app.get('/home', (req, res)=>{
    res.sendFile(path.join(__dirname+'/test.html'));
})

app.post('/', passport.authenticate('local',{
    successRedirect :'/home',
    successFlash: true,
    failureRedirect:'login',
    failureFlash: true, 
}));

// app.get('/login', (req, res) => {
//     res.json(users);
// })

// app.post('/login', async (req, res)=> {
//     const user = req.body.username;
//     const email = req.body.email;
//     try{
//     const hashPassword = await bcrypt.hash(req.body.password,1024);
//     users.push({ 
//         id:Date.now().toString(),
//         name: user,
//         password: hashPassword,
//         email: email,
//     })
//     console.log(users);
//     res.send('record added!');
    
// }catch{
//     res.sendStatus(404);
// }
// });

app.listen(3000);
