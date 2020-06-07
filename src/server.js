  const express = require("express")

  const server = express()

//pegar banco de dado]s
const db = require("./database/db")

  //configurar pasta public
  server.use(express.static("public"))


//habilitar o uso do req.body
server.use(express.urlencoded({extended:true}))  

//configurar caminhos da aplicação 

// para ter um html dinanamico, configurando o nunjucks

const nunjucks = require("nunjucks")
nunjucks.configure("src/views",{
    express: server,
    noCache: true
})

//pagina inicial
// requisição = req
// respostas = res
server.get("/",(req, res)=>{
    return res.render("index.html")
})

server.get("/create-point",(req, res)=>{
    //req.query =Query strings da nossa url
    //console.log(req.query)



    return res.render("create-point.html",)
})

server.post("/savepoint", (req,res)=>{
        
    //req.body corpo do form
  //  console.log(req.body)
    // inserir dados no banco de dados

    const query = `
             INSERT INTO places(
                 image,
                 name,
                 address,
                 address2,
                 state,
                city,
                 items
            ) VALUES (?,?,?,?,?,?,?);
             `
        
            const values =[
                req.body.image,
                req.body.name,
                req.body.address,
                req.body.address2,
                req.body.state,
                req.body.city,
                req.body.items
            ]
    
    
        function afterInsertData(err){
            if(err){
                return res.send("Erro No Cadastro")
            }
            
            console.log("Cadastrado com Sucesso")
            console.log(this)
            return res.render("create-point.html",{saved: true})
        }
       
     db.run(query, values, afterInsertData)


    
})



server.get("/search-results",(req, res)=>{

const search= req.query.search

if(search==""){
    //pesquisa vazia
    return res.render("search-results.html",{total:0})
}


    //pegar dados do nanco de dados 
 db.all(`SELECT * FROM places WHERE city LIKE'%${search}%'`, function(err,rows){
    if(err){
        return console.log(err)
        

    }
    const total = rows.length
    // mostrar a pagina com os dados do banco
    return res.render("search-results.html",{places: rows,total})    
})


    
})


  //ligar o servidor
  server.listen(3000)