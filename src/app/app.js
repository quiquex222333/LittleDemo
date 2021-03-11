const express = require('express')
const faker = require('faker')
const fs = require('fs')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/users', function (req, res){
    let users = [];
    for (let index = 0; index < 100; index++) {
        const newUser = ({
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            userName: faker.internet.userName(),
            email: faker.internet.email(),
        });
        users.push(newUser);
    }
    res.status(200).send(users);
})

app.post('/user', function (req, res) {
    let errMsg = {missingFields: []};
    if(!req.body.firstName) {
        errMsg.missingFields.push("firstName");
    }
    if(!req.body.lastName) {
        errMsg.missingFields.push("lastName");
    }
    if(!req.body.username) {
        errMsg.missingFields.push("username");
    }
    if(!req.body.email) {
        errMsg.missingFields.push("email");
    }
    if(errMsg.missingFields.length === 0) {
        fs.appendFile('users_backup.txt', '\n' + JSON.stringify(req.body) + ',', function (err) {
            if (err) throw err;
            res.status(200).send(req.body);
        })
    } else {
        res.status(400).send({type: "Error", missingFields:errMsg.missingFields})
    }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})