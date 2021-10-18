///////////////////////////////////////////////////////////////////
// Imports
const express = require("express");
const fs      = require('fs')
global.config = require("./config.js");

///////////////////////////////////////////////////////////////////
// Configuração do servidor

let server  = express();
server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(express.static(config.RECURSOS));

///////////////////////////////////////////////////////////////////
// Rotas

server.get(['/index.html', '/'], (req, res) => 
{
    res.sendFile(config.HTML_MAIN);
});

server.get('/style.css', (req, res) => 
{
    res.sendFile(config.CSS_MAIN);
});


server.listen(config.PORT)