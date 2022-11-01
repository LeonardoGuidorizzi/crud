/****************************************************************
ObjetivoArquivo responsal pela manipulacao de dados com Bd 
(insert, update,delete e selct)
Autor:Leonardo
Data Criacao: 06/10/2022
versao:1.0



*****************************************************************/

//funcao para inserir um novo registro no banco de dados
const { PrismaClient } = require('@prisma/client');
const { MESSAGE_ERROR } = require('../../module/config');


const prisma = new PrismaClient()

//Adicionar um aluno
const insertAluno = async (aluno) => {

    try {
        console.log(aluno);
        let sql = `insert into tbl_aluno(nome,
                                        foto,
                                        rg,
                                        cpf ,
                                        email,
                                        data_nascimento,
                                        telefone,
                                        celular,
                                        sexo)
                                        values(
                                            '${aluno.nome}',
                                            '${aluno.foto}',
                                            '${aluno.rg}',
                                            '${aluno.cpf}',
                                            '${aluno.email}',
                                            '${aluno.data_nascimento}',
                                        ' ${aluno.telefone}',
                                            '${aluno.celular}',
                                            '${aluno.sexo}'
                                        )`

        //executa o script SQL no banco de dados  
        //($ExecuteRawUnsafe perminte encaminhar uma varivael contendo o script)
        const result = await prisma.$executeRawUnsafe(sql)
        if (result) {
            return true
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}




//atualizar um registro do db
const updateAluno = async (aluno) => {

    try {
        let sql = `update tbl_aluno set nome  = '${aluno.nome}',
                                        foto  = '${aluno.foto}' ,
                                        rg    = '${aluno.rg}',
                                        cpf   = '${aluno.cpf}' ,
                                        email = '${aluno.email}',
                                        data_nascimento = '${aluno.data_nascimento}',
                                        telefone        = '${aluno.telefone}',
                                        celular         = '${aluno.celular}',
                                        sexo            = '${aluno.sexo}'
                        
                          where id = '${aluno.id}'              
           
            `

        const result = await prisma.$executeRawUnsafe(sql)
        if (result) {
            return true
        } else {
            return false
        }

    } catch (error) {
        return false
    }

}




// deletar um registro do DB
const deleteAluno = async (id) => {

    try {
        const prisma = new PrismaClient()

        //comando no sql que apaga tal informacao
        let sql = `delete from tbl_aluno
                    where id ='${id}'`


        const result = await prisma.$executeRawUnsafe(sql)
        if (result) {
            return true
        } else {
            return false
        }

    } catch (error) {
        return false
    }

}




// retortar todos os registros do db 
const selectByIdAluno = async (id) => {

    const {PrismaClient} = require('@prisma/client')

    const prisma = new PrismaClient()
    
    let sql = ` select cast(id as float) as id ,
    foto,
    rg,
    nome,
    cpf ,
    email,
    data_nascimento,
    telefone,
    celular,
    sexo
     from tbl_aluno
     where id = ${id}`
    //Criamos um objeto do tipo RecordSet (rsALunos) para receber os dados do Bd
    //atarves do script SQL (select)
    const rsAlunos = await prisma.$queryRawUnsafe(sql)

    if (rsAlunos.length > 0) {
        return rsAlunos
    } else {
        return false
    }
}




// retortar todos os registros do db 
const selectAllAlunos = async () => {

    //Criamos um objeto do tipo RecordSet (rsALunos) para receber os dados do Bd
    //atarves do script SQL (select)
    const rsAlunos = await prisma.$queryRaw`select * from tbl_aluno order by id desc`

    if (rsAlunos.length > 0) {
        return rsAlunos
    } else {
        return false
    }
}

const selectLastid = async function {
    const prisma = new PrismaClient()

    let sql = `select cast (id as float) as id
           
    
    
    
    `
}
module.exports = { selectAllAlunos, insertAluno, updateAluno, deleteAluno, selectByIdAluno}
