/****************************************************************
ObjetivoArquivo responsal pela configuracao de variaveis, constantes e mensagens do sistema
(insert, update,delete e selct)
Autor:Leonardo
Data Criacao: 13/10/2022
versao:1.0



*****************************************************************/

const MESSAGE_ERROR = {
    REQUIRED_FILDS : 'Existe(m) campo(s) obrigatorio(s) que deve(m) ser enviado(s)!',
    INVALID_EMAIL  : 'O e-mail informado nao e valido',
    CONTENT_TYPE   : 'O cabecalho da requisicao nao possui um Content-Type valido',
    EMPTY_BODY     : 'O body da requisicao nao pode ser vazio',
    NOT_FOUND_DB   : 'Nao foram encontrados registros no Banco de dados',
    INTERNAL_ERROR : 'Nao foi possivel relizar a aperacao com o Banco de Dados',
    REQUIRED_ID : 'id nao existente!'
}

const MESSAGE_SUCESS = {
    INSERT_ITEM    : 'ITEM CRIADO COM SUCESSO NO BANCO DE DADOS',
    UPDATE_ITEM    : 'ITEM ATUALIZADO COM SUCESSO NO BANCO DE DADOS',
    DELETE_ITEM    : 'ITEM EXCLUIDO  COM SUCESSO NO BANCO DE DADOS',
}
module.exports = {
    MESSAGE_ERROR,
    MESSAGE_SUCESS
}