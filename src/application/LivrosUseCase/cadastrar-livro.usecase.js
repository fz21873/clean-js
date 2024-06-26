const { Either, AppError } = require("../../shared/errors");
const { valorJaCadastrado } = require("../../shared/errors/Either");


module.exports = function cadastrarLivroUseCase({ livrosRepository }){
  if (!livrosRepository) throw new AppError(AppError.dependencias); 
  return async function({ nome, quantidade, autor, genero, ISBN}) {
    const checaCampos = nome && quantidade && autor && genero && ISBN;
    if(!checaCampos) throw new AppError(AppError.camposObrigatoriosAusentes);

    const checaSeJaExisteLivroCadastradoComISBN = await livrosRepository.existePorISBN(ISBN);
    if(checaSeJaExisteLivroCadastradoComISBN) return Either.Left(Either.valorJaCadastrado('ISBN'));

    await livrosRepository.cadastrar({
        nome, 
        quantidade,
        autor, 
        genero, 
        ISBN
      })
   return Either.Rigth(null)
  }
}