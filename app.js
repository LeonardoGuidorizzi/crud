/****************************************************************
ObjetivoArquivo responsal pela manipulacao de dados NAckend
(GET, POST, PUT, DELETE)
Autor:Leonardo
Data Criacao: 10/10/2022
versao:1.0



*****************************************************************/





//PAra manipular o acesso a BD podemos utilizar o Prisma 
//Parar instalar o prisma, devemos rodar os seguintes comnados 

// npm install prisma --save
//npx prisma 
//npx prisma init 
//npm install @prisma/client 

//import da bibliotecas

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { MESSAGE_ERROR, MESSAGE_SUCESS } = require('./module/config')

const { response } = require('express')


const app = express()

app.use((request, response, next) => {
    response.header('Acces-Control-Allow-Origin', '*')
    response.header('Acces-Control-Allow-Origin', 'GET, PUT, POST, DELETE, OPTION')

    app.use(cors())
    next()
})
//permite receber um json nas requisicoes
const jsonParser = bodyParser.json()
/*********************************************
 * 
 * 
 * Rotas para CRUD (create, read, update, delete) de alunos
 * Data 10/10/2022
 * 
 * 
 * 
 */




// End-Points de alunos 





//listar todos os alunos
app.get('/v1/alunos', cors(), async function (request, response) {
    let statusCode
    let mensage

    const controllerAluno = require('./controller/controllerAluno.js')

    const dadosAlunos = await controllerAluno.listarAlunos();
    if (dadosAlunos) {
        statusCode = 200;
        mensage = dadosAlunos;
    } else {
        statusCode = 404;
        mensage = "Nenhum aluno encontrado";
    }



    response.status(statusCode)
    response.json(mensage)
})
//end point para inserir um novo aluno
app.post('/v1/aluno', cors(), jsonParser, async function (request, response) {
    let statusCode
    let mensage
    let headerContentType

    //recebe o tipo de content type que foi enviar no header da requisicao
    headerContentType = request.headers['content-type']
    //validar o contentype 
    if (headerContentType == 'application/json') {
        //recebe do corpo da mensagem o conteudo
        let dadosBody = request.body
        //realiza um processo de conversao de dados para conseguir comparar o json vazio
        if (JSON.stringify(dadosBody) != '{}') {
            //import arquivo controlleraluno
            const { createALuno } = require('./controller/controllerAluno.js')
            //chama a funcao novoAluno da controller e encaminha os dadosbody
            const novoAluno = await createALuno(dadosBody)

            statusCode = novoAluno.status
            mensage = novoAluno.mensage

        } else {
            statusCode = 400
            mensage = MESSAGE_ERROR.EMPTY_BODY
        }


    } else {
        statusCode = 415
        mensage = MESSAGE_ERROR.CONTENT_TYPE
    }
    response.status(statusCode)
    response.json(mensage)

});
//end point para deltar um aluno
app.delete('/v1/aluno/:id', cors(), jsonParser, async function (request, response) {
    
    let statusCode
    let mensage
    let id = request.params.id
    console.log(id);


    if (id != '' && id != undefined) {
        //Adiciona o id no JSON que chegou do corpo da requisicao
            const { excluirAluno } = require('./controller/controllerAluno.js')
            //chama a funcao novoAluno da controller e encaminha os dadosbody
            const deleteAluno = await excluirAluno(id)

            statusCode = deleteAluno.status
            mensage = deleteAluno.mensage
    }else{
        statusCode = 400
            mensage = MESSAGE_ERROR.REQUIRED_ID
    }
     

    response.status(statusCode)
    response.json(mensage)

});
//Endpoint para atualizar um aluno existente
app.put('/v1/aluno/:id', cors(), jsonParser, async function (request, response) {
    let statusCode
    let mensage
    let headerContentType

    //recebe o tipo de content type que foi enviar no header da requisicao
    headerContentType = request.headers['content-type']
    //validar o contentype 
    if (headerContentType == 'application/json') {
        //recebe do corpo da mensagem o conteudo
        let dadosBody = request.body
        //realiza um processo de conversao de dados para conseguir comparar o json vazio
        if (JSON.stringify(dadosBody) != '{}') {

            let id = request.params.id

            //Validacao do ID na requisicao
            if (id != '' & id != undefined) {
                //Adiciona o id no JSON que chegou do corpo da requisicao
                dadosBody.id = id
                //import arquivo controlleraluno
                const { updateAluno } = require('./controller/controllerAluno.js')
                //chama a funcao updateAluno da controller e encaminha os dadosbody
                const updatingAluno = await updateAluno(dadosBody)
                statusCode = updatingAluno.status
                mensage = updatingAluno.mensage

            } else {
                statusCode = 400
                mensage = MESSAGE_ERROR.EMPTY_BODY
            }
        } else {
            statusCode = 415
            mensage = MESSAGE_ERROR.CONTENT_TYPE
        }
        response.status(statusCode)
        response.json(mensage)
    }
})
//Endpoint para achar um aluno
app.get('/v1/aluno/:id', cors(), jsonParser, async function (request, response) {
    
    let statusCode
    let mensage
    let id = request.params.id

    //validacao do ID na requisicao
    if (id != '' && id != undefined) {
        //Adiciona o id no JSON que chegou do corpo da requisicao
            const controllerAluno  = require('./controller/controllerAluno.js')
            //chama a funcao novoAluno da controller e encaminha os dadosbody
            const dadosAluno = await controllerAluno.buscarAluno(id)
            
            if (dadosAluno) {
                statusCode = 200
                mensage = dadosAluno
            }else{
                statusCode = 400
                mensage = MESSAGE_ERROR.NOT_FOUND_DB
            }

        }else{
            statusCode = 400
            mensage = MESSAGE_ERROR.REQUIRED_ID
        }
     

    response.status(statusCode)
    response.json(mensage)

});


//End-Points de cursos

app.get('/v1/cursos', cors(), async function (request, response) {
    let statusCode
    let mensage

    const controllerCurso= require('./controller/controllerCurso.js')

    const dadosCursos = await controllerCurso.listarCurso();
    if (dadosCursos) {
        statusCode = 200;
        mensage = dadosCursos;
    } else {
        statusCode = 404;
        mensage = "Nenhum Curso encontrado";
    }



    response.status(statusCode)
    response.json(mensage)
})





//end point para inserir um novo Curso
app.post('/v1/curso', cors(), jsonParser, async function (request, response) {
    let statusCode
    let mensage
    let headerContentType

    //recebe o tipo de content type que foi enviar no header da requisicao
    headerContentType = request.headers['content-type']
    //validar o contentype 
    if (headerContentType == 'application/json') {
        //recebe do corpo da mensagem o conteudo
        let dadosBody = request.body
        //realiza um processo de conversao de dados para conseguir comparar o json vazio
        if (JSON.stringify(dadosBody) != '{}') {
            //import arquivo controllerCurso
            const { createCurso } = require('./controller/controllerCurso.js')
            //chama a funcao novoCurso da controller e encaminha os dadosbody
            const novoCurso = await createCurso(dadosBody)

            statusCode = novoCurso.status
            mensage = novoCurso.mensage

        } else {
            statusCode = 400
            mensage = MESSAGE_ERROR.EMPTY_BODY
        }


    } else {
        statusCode = 415
        mensage = MESSAGE_ERROR.CONTENT_TYPE
    }
    response.status(statusCode)
    response.json(mensage)

});




//end point para deletar um curso
app.delete('/v1/curso/:id', cors(), jsonParser, async function (request, response) {
    
    let statusCode
    let mensage
    let id = request.params.id
    console.log(id);


    if (id != '' && id != undefined) {
        //Adiciona o id no JSON que chegou do corpo da requisicao
            const { excluirCurso } = require('./controller/controllerCurso.js')
            //chama a funcao novoAluno da controller e encaminha os dadosbody
            const deleteCurso = await excluirCurso(id)

            statusCode = deleteCurso.status
            mensage = deleteCurso.mensage
    }else{
        statusCode = 400
            mensage = MESSAGE_ERROR.REQUIRED_ID
    }
     

    response.status(statusCode)
    response.json(mensage)

});



//Endpoint para atualizar um curso existente
app.put('/v1/curso/:id', cors(), jsonParser, async function (request, response) {
    let statusCode
    let mensage
    let headerContentType

    //recebe o tipo de content type que foi enviar no header da requisicao
    headerContentType = request.headers['content-type']
    //validar o contentype 
    if (headerContentType == 'application/json') {
        //recebe do corpo da mensagem o conteudo
        let dadosBody = request.body
        //realiza um processo de conversao de dados para conseguir comparar o json vazio
        if (JSON.stringify(dadosBody) != '{}') {

            let id = request.params.id

            //Validacao do ID na requisicao
            if (id != '' & id != undefined) {
                //Adiciona o id no JSON que chegou do corpo da requisicao
                dadosBody.id = id
                //import arquivo controlleraluno
                const { updateCurso } = require('./controller/controllerCurso.js')
                //chama a funcao updateAluno da controller e encaminha os dadosbody
                const updatingCurso = await updateCurso(dadosBody)
                statusCode = updatingCurso.status
                mensage = updatingCurso.mensage

            } else {
                statusCode = 400
                mensage = MESSAGE_ERROR.EMPTY_BODY
            }
        } else {
            statusCode = 415
            mensage = MESSAGE_ERROR.CONTENT_TYPE
        }
        response.status(statusCode)
        response.json(mensage)
    }
})



//Endpoint para achar um curso
app.get('/v1/curso/:id', cors(), jsonParser, async function (request, response) {
    
    let statusCode
    let mensage
    let id = request.params.id

    //validacao do ID na requisicao
    if (id != '' && id != undefined) {
        //Adiciona o id no JSON que chegou do corpo da requisicao
            const controllerCurso  = require('./controller/controllerAluno.js')
            //chama a funcao novoAluno da controller e encaminha os dadosbody
            const dadosCursos= await controllerCurso.buscarCurso(id)
            
            if (dadosCursos) {
                statusCode = 200
                mensage = dadosCursos
            }else{
                statusCode = 400
                mensage = MESSAGE_ERROR.NOT_FOUND_DB
            }

        }else{
            statusCode = 400
            mensage = MESSAGE_ERROR.REQUIRED_ID
        }
     

    response.status(statusCode)
    response.json(mensage)

});

    


app.listen(5050, function () {
    console.log('Servidor aguardando requisicoes!');
})




