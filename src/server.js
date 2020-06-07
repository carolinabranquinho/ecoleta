const express = require("express");
const server = express();

//BD
const db = require("./database/db");


//configurar pasta public
server.use(express.static("public"));

//habilitar o uso do req.body
server.use(express.urlencoded({ extended: true }));

// utilizando template engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// configurar rotas
//página inicial  req == requisição res == resposta

server.get("/", (req, res) => {
    return res.render("index.html");
})

server.get("/create-point", (req, res) => {

    //query strings da url
    //console.log(req.query)
   
    return res.render("create-point.html");
})


server.post("/savepoint", (req, res) => {
    //req.body == corpo do formulario
    //console.log(req.body)

    //bd
    const query = `
        INSERT INTO places (
            image,
            name, 
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(error){
        if(error){
            console.log(error);
            return res.render("create-point.html", { erro: true });
        }

        console.log("Cadastrado com Sucesso");
        console.log(this);
        return res.render("create-point.html", { saved: true });
    }

    //insere dados
    db.run(query, values, afterInsertData)
})

server.get("/search", (req, res) => {

    const search = req.query.search

    if(search == ""){
        return res.render("search-results.html", { total: 0 });
    }

    //buscar dados do db
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
        if(err){
           return console.log(err);
        }

        const total = rows.length;
        //página com os dados
        return res.render("search-results.html", { places: rows, total});
    })
})

// liga o servidor
server.listen(3000);

