const express = require('express');
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json());


const users = [];

app.get('/login', (req, res) => {
    res.json(users);
})

app.post('/login', (req, res) => {
    try{
    const username = req.body.username;
    const password = bcrypt.hash(req.body.password);
    const email = req.body.email;
    users.push({ 
        name: username,
        password: password,
        email: email
    })
    res.send('record added!');
}catch{
    res.send(err);
}
    
})

app.listen(3000);
