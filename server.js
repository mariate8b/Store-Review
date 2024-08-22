const express = require('express')

const server = express();

server.get('/',(req, res) =>{
    res.send({message: 'Working'})
})

server.use("/user", require("./api/index"));

module.exports = server;