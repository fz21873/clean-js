const buscarLivrosPorNomeOuIsbnUsecase = require("../src/application/LivrosUseCase/buscar-livros-por-nome-ou-isbn.usecase");

describe('Buscar Livros por nome ou ISBN  UseCase',function(){
   const livrosRepository ={
    buscarPorNomeOuISBN: jest.fn(),
   }
 test('Deve retornar um livro valido ao buscar por nome ou ISBN existente', async function(){
   const  nomeISBNDTO = {
        valor: 'valor_valido',
    };

    const outputDTO = [{
        id:'id_valido',
        nome: 'nome_valido',
        quantidade:'quantidade_valido',
        autor: 'autor_valido',
        genero: 'genero_valido',
        ISBN: 'ISBN_valido'
      }];

    livrosRepository.buscarPorNomeOuISBN.mockResolvedValue(outputDTO);
    const sut = buscarLivrosPorNomeOuIsbnUsecase({livrosRepository});
    output = await sut(nomeISBNDTO);

    expect(output.rigth).toEqual(outputDTO);
    expect(livrosRepository.buscarPorNomeOuISBN).toHaveBeenCalledWith(nomeISBNDTO.valor);
    expect(livrosRepository.buscarPorNomeOuISBN).toHaveBeenCalledTimes(1);
  });
}); 