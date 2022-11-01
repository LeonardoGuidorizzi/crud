const insertAlunoCurso = async (alunoCurso) => {

    try {
        console.log(aluno);
        let sql = `insert into tbl_aluno_curso(id_aluno, id_curso)
                                        values(
                                            '${alunoCurso.idAluno}',
                                            '${alunoCurso.idCurso}'
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

