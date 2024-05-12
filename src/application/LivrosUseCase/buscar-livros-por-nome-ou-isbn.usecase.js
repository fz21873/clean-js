const { Either } = require("../../shared/errors")

module.exports = function bucarLivroPorNomeOuISBNUseCase({livrosRepository}){
    return async function({valor}){
     const livros = await livrosRepository.buscarPorNomeOuISBN(valor);
     return Either.Rigth(livros);
    }
}