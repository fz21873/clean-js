const { Either, AppError } = require("../../shared/errors")

module.exports = function buscarLivrosPorNomeOuIsbnUseCase({livrosRepository}){
    if(!livrosRepository) throw new AppError(AppError.dependencias);
    return async function({valor}){
    const checaCampos = valor;
     if(!checaCampos) throw new AppError(AppError.camposObrigatoriosAusentes);
     const livros = await livrosRepository.buscarPorNomeOuISBN(valor);
     return Either.Rigth(livros);
    }
}