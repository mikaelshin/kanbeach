///////////////////////////////////////////////////////////////////
// Imports
const { Console } = require("console");
const express = require("express");
const res = require("express/lib/response");
const fs      = require('fs');
const { Server } = require("http");
global.config = require("./config.js");

///////////////////////////////////////////////////////////////////
// Configuração do servidor

let server  = express();
server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(express.static(config.RECURSOS));

///////////////////////////////////////////////////////////////////
// Boards

function storeBoard(data)
{
    fs.writeFileSync(config.BOARDS + "/" + data.key + ".json", JSON.stringify(data), {flag:'w'})
}

function deleteBoard(data)
{
    fs.unlink(config.BOARDS + "/" + data.key + ".json", (err) => {})
}

///////////////////////////////////////////////////////////////////
// Rotas

server.get('/main', (req, res) => 
{
    //res.sendFile(config.HTML_MAIN);
    res.sendFile(config.HTML_MAIN);
});

server.get(['/index.html', '/'], (req, res) => 
{
    res.sendFile(config.LOGIN);
});

server.get('/cadastro', (req, res) => 
{
    res.sendFile(config.CADASTRO);
});

server.get('/style.css', (req, res) => 
{
    res.sendFile(config.CSS_MAIN);
});

server.post('/storeboard', (req, res) => 
{
    storeBoard(req.body)
    res.send({})
    res.end();
});

server.post('/delboard', (req, res) =>
{
    deleteBoard(req.body)
    res.send({})
    res.end();
});

server.get('/getboards', (req, res) => 
{
    fs.readdir(config.BOARDS, (err, data) => 
    {
        let boards = [];

        for (let i = 0; i < data.length; i++)
        {
            fs.readFile(config.BOARDS + "/" + data[i], (err, info) =>
            {
                boards.push(JSON.parse(info))

                if (boards.length == data.length)
                {
                    boards = boards.sort()
                    res.send(boards)
                    res.end()
                }
            });
        }
    });
});

server.listen(config.PORT)
