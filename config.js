let config_servidor =
{
    PORT: 8002
}

let config_recursos = 
{
    RECURSOS : "/kanbeach-frontend/recursos", 
    HTML_MAIN: "/kanbeach-frontend/index.html",
    CSS_MAIN : "/kanbeach-frontend/style.css",
    BOARDS   : "/kanbeach-frontend/recursos/boards",
    LOGIN    : "/kanbeach-frontend/recursos/Login/index.html",
    CADASTRO : "/kanbeach-frontend/recursos/cadastro/index.html"
};

vars = Object.keys(config_recursos)

for(let i = 0; i < vars.length; i++)
    config_recursos[vars[i]] = __dirname + config_recursos[vars[i]] 

let config = {...config_servidor, ...config_recursos}

module.exports = config