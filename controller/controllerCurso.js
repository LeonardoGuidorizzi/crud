/****************************************************************
ObjetivoArquivo responsal pela manipulacao de recebimento, tratamento e retorno de dados entre a API e a model 
Autor:Leonardo
Data Criacao: 06/10/2022
versao:1.0



*****************************************************************/

const { insertCurso} = require('../model/DAO/curso.js')
const { MESSAGE_ERROR, MESSAGE_SUCESS } = require('../module/config')
const createCurso= async (curso) => {
    //validaocao dos campos obrigatorios 
    if (curso.nome == undefined || curso.nome == '' || curso.carga_horaria == undefined || curso.carga_horaria == '') {
        return { status: 400, mensage: MESSAGE_ERROR.REQUIRED_FILDS }
        //validao para verificar email valido 
    } else {
        //import da model de curso
        const novoCurso = require(`../model/DAO/Curso.js`)
        //chama a funcao para inserir o curso
        const result = await insertCurso(curso)
        if (result) {
            return { status: 201, mensage: MESSAGE_SUCESS.INSERT_ITEM }
        } else {
            return { status: 500, mesage: MESSAGE_ERROR.INTERNAL_ERROR }
        }
    }
}

const updateCurso = async (curso) => {


    if (curso.id == undefined || curso.id == "") {
        return { status: 400, mensage: MESSAGE_ERROR.REQUIRED_ID }
        //validaocao dos campos obrigatorios 
    } else if (curso.nome == undefined || curso.nome == '' || curso.carga_horaria == undefined || curso.carga_horaria == '') {
        return { status: 400, mensage: MESSAGE_ERROR.REQUIRED_FILDS }
    } else {
        //import da model de aluno
        const updatingCurso= require(`../model/DAO/curso.js`)
        //chama a funcao para atualizar o aluno
        const result = await updatingCurso.updateCurso(curso)
        if (result) {
            return { status: 200, mensage: MESSAGE_SUCESS.UPDATE_ITEM }
        } else {
            return { status: 500, mesage: MESSAGE_ERROR.INTERNAL_ERROR }
        }
    }
}

const excluirCurso = async (id) => {
    if (id == undefined || id == "") {
        return { status: 400, mensage: MESSAGE_ERROR.REQUIRED_ID }
    } else {
        const curso = await buscarCurso(id)
        if (curso) {
            //import da model de aluno
            const excluirCurso = require(`../model/DAO/curso.js`)
            //chama a funcao para excluir o aluno
            const result = await excluirCurso.deleteCurso(id)
            console.log(result);
            if (result) {
                return { status: 200, mensage: MESSAGE_SUCESS.DELETE_ITEM }
            } else {
                return { status: 500, mesage: MESSAGE_ERROR.INTERNAL_ERROR }
            }
        }
    }
}





const listarCurso = async function () {
    let dadosCursosJSON = {}
    const { selectAllCursos } = require('../model/DAO/curso.js')

    const dadosCursos= await selectAllCursos()



    if (dadosCursos) {
        dadosCursos.forEach(element => {
            element.id = Number(element.id)
        });
        dadosCursosJSON.curso = dadosCursos
        return dadosCursosJSON
    }
    else {
        return false
    }
}


const buscarCurso = async function (id) {
    let dadosCursoJSON = {}


    if (id == undefined || id == "") {
        return { status: 400, mensage: MESSAGE_ERROR.REQUIRED_ID }
    } else {
        //Validacao para verificar se o id esta no banco de dados

        const { selectByIdCurso } = require('../model/DAO/curso.js')

        const dadosCursos = await selectByIdCurso(id)



        if (dadosCursos) {

            dadosCursoJSON.curso = dadosCursos
            return dadosCursoJSON
        }
        else {
            return false
        }
    }
}




module.exports = {
    createCurso,
    updateCurso,
    excluirCurso,
    listarCurso,
    buscarCurso
}
