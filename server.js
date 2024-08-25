const express = require('express')

const server = express();

server.use(express.json());

server.get('/',(req, res) =>{
    res.send({message: 'Working'})
})

server.use("/user", require("./api/index"));

module.exports = server;