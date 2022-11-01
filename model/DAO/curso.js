/****************************************************************
ObjetivoArquivo responsal pela manipulacao de dados com Bd 
(insert, update,delete e selct)
Autor:Leonardo
Data Criacao: 06/10/2022
versao:1.0



*****************************************************************/


const { PrismaClient } = require('@prisma/client');
const { MESSAGE_ERROR } = require('../../module/config');

const prisma = new PrismaClient()

const insertCurso = async (curso) => { //(objeto)
    try {
        let sql = `insert into tbl_curso(nome,
                                          carga_horaria,
                                          icone,
                                          sigla)
                                          values(
                                            '${curso.nome}',
                                            '${curso.carga_horaria}',
                                            '${curso.icone}',
                                            '${curso.sigla}'
                                          )`
                                          console.log(sql);
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

const updateCurso = async (curso) => {
    try {
        let sql = `update tbl_curso set nome          = '${curso.nome}',
                                        carga_horaria = '${curso.horaria}',
                                        icone         = '${curso.icone}',
                                        sigla         = '${curso.sigla}'

                               where id '${curso.id}'         
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

const deleteCurso = async (id) => {
    try {
        const prisma = new PrismaClient()
        let sql = `delete from tbl_curso
                    where id = '${id}'


        `
        console.log(sql);
        result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const selectByIdCurso = async (id) => {
    const { PrismaClient } = require('@prisma/client')

    const prisma = new PrismaClient()

    let sql = ` select cast(id as float) as id ,
    nome,
    carga_horaria,
    icone,
    sigla
    from tbl_curso
    where id = ${id}
    `
    const rsCursos = await prisma.$queryRawUnsafe(sql)

    if (rsCursos.length > 0) {
        return rsCursos
    } else {
        return false
    }
}

const selectAllCursos = async () => {

    const { PrismaClient } = require('@prisma/client')

    const prisma = new PrismaClient()


    let sql = ` select cast(id as float) as id ,
    nome,
    carga_horaria,
    icone,
    sigla
    from tbl_curso order by id desc
    `
     const rsCursos = await prisma.$queryRawUnsafe(sql)
    if (rsCursos.length > 0) {
        return rsCursos
    } else {
        return false
    }
}

module.exports = {insertCurso, updateCurso, deleteCurso, selectAllCursos, selectByIdCurso}