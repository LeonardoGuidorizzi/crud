/****************************************************************
ObjetivoArquivo responsal pela manipulacao de recebimento, tratamento e retorno de dados entre a API e a model 
Autor:Leonardo
Data Criacao: 06/10/2022
versao:1.0



*****************************************************************/
const { insertAluno } = require('../model/DAO/aluno.js')
const { MESSAGE_ERROR, MESSAGE_SUCESS } = require('../module/config')
const createALuno = async (aluno) => {
    //validaocao dos campos obrigatorios 
    if (aluno.nome == undefined || aluno.nome == '' || aluno.carga_horaria == undefined || aluno.carga_horaria == '' || aluno.rg == undefined || aluno.rg == '' || aluno.cpf == undefined || aluno.cpf == '' || aluno.email == undefined || aluno.email == '' || aluno.data_nascimento == undefined || aluno.data_nascimento == '') {
        return { status: 400, mensage: MESSAGE_ERROR.REQUIRED_FILDS }
        //validao para verificar email valido 
    } else if (!aluno.email.includes('@')) {
        return { status: 400, mensage: MESSAGE_ERROR.INVALID_EMAIL }
    } else {
        //import da model de aluno
        const novoAluno = require(`../model/DAO/aluno`)
        //chama a funcao para inserir o aluno
        const result = await insertAluno(aluno)
        if (result) {
            return { status: 201, mensage: MESSAGE_SUCESS.INSERT_ITEM }
        } else {
            return { status: 500, mesage: MESSAGE_ERROR.INTERNAL_ERROR }
        }
    }
}

const updateAluno = async (aluno) => {


    if (aluno.id == undefined || aluno.id == "") {
        return { status: 400, mensage: MESSAGE_ERROR.REQUIRED_ID }
        //validaocao dos campos obrigatorios 
    } else if (aluno.nome == undefined || aluno.nome == '' || aluno.foto == undefined || aluno.foto == '' || aluno.rg == undefined || aluno.rg == '' || aluno.cpf == undefined || aluno.cpf == '' || aluno.email == undefined || aluno.email == '' || aluno.data_nascimento == undefined || aluno.data_nascimento == '') {
        return { status: 400, mensage: MESSAGE_ERROR.REQUIRED_FILDS }
        //validao para verificar email valido 
    } else if (!aluno.email.includes('@')) {
        return { status: 400, mensage: MESSAGE_ERROR.INVALID_EMAIL }
    } else {
        //import da model de aluno
        const updatingAluno = require(`../model/DAO/aluno`)
        //chama a funcao para atualizar o aluno
        const result = await updatingAluno.updateAluno(aluno)
        if (result) {
            return { status: 200, mensage: MESSAGE_SUCESS.UPDATE_ITEM }
        } else {
            return { status: 500, mesage: MESSAGE_ERROR.INTERNAL_ERROR }
        }
    }
}

const excluirAluno = async (id) => {
    if (id == undefined || id == "") {
        return { status: 400, mensage: MESSAGE_ERROR.REQUIRED_ID }
    } else {
        const aluno = await buscarAluno(id)
        if (aluno) {
            //import da model de aluno
            const excluirAluno = require(`../model/DAO/aluno`)
            //chama a funcao para excluir o aluno
            const result = await excluirAluno.deleteAluno(id)
            if (result) {
                return { status: 200, mensage: MESSAGE_SUCESS.DELETE_ITEM }
            } else {
                return { status: 500, mesage: MESSAGE_ERROR.INTERNAL_ERROR }
            }
        }
    }
}





const listarAlunos = async function () {
    let dadosAlunosJSON = {}
    const { selectAllAlunos } = require('../model/DAO/aluno.js')

    const dadosAlunos = await selectAllAlunos()



    if (dadosAlunos) {
        dadosAlunos.forEach(element => {
            element.id = Number(element.id)
        });
        dadosAlunosJSON.alunos = dadosAlunos
        return dadosAlunosJSON
    }
    else {
        return false
    }
}


const buscarAluno = async function (id) {
    let dadosAlunosJSON = {}


    if (id == undefined || id == "") {
        return { status: 400, mensage: MESSAGE_ERROR.REQUIRED_ID }
    } else {
        //Validacao para verificar se o id esta no banco de dados

        const { selectByIdAluno } = require('../model/DAO/aluno.js')

        const dadosAlunos = await selectByIdAluno(id)



        if (dadosAlunos) {

            dadosAlunosJSON.aluno = dadosAlunos
            return dadosAlunosJSON
        }
        else {
            return false
        }
    }
}




module.exports = {
    createALuno,
    updateAluno,
    excluirAluno,
    listarAlunos,
    buscarAluno
}
