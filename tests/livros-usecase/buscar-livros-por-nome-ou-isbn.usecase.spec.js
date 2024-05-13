
const buscarLivrosPorNomeOuIsbnUseCase = require("../../src/application/LivrosUseCase/buscar-livros-por-nome-ou-isbn.usecase");
const { AppError } = require("../../src/shared/errors");

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
    const sut = buscarLivrosPorNomeOuIsbnUseCase({livrosRepository});
    output = await sut(nomeISBNDTO);

    expect(output.rigth).toEqual(outputDTO);
    expect(livrosRepository.buscarPorNomeOuISBN).toHaveBeenCalledWith(nomeISBNDTO.valor);
    expect(livrosRepository.buscarPorNomeOuISBN).toHaveBeenCalledTimes(1);
  });

  test('Deve retornar um arry vazio quando não existir um livro com o nome ou ISBN informados', async function(){
    livrosRepository.buscarPorNomeOuISBN.mockResolvedValue([]);
    const  nomeISBNDTO = {
        valor: 'valor_nao_cadastrado',
    };
    const sut = buscarLivrosPorNomeOuIsbnUseCase({livrosRepository})
    const output = await sut(nomeISBNDTO);
    expect(output.rigth).toEqual([]);
    expect(livrosRepository.buscarPorNomeOuISBN).toHaveBeenCalledWith(nomeISBNDTO.valor);
    expect(livrosRepository.buscarPorNomeOuISBN).toHaveBeenCalledTimes(1);
  });

  test('Deve retornar um throw AppError se o livrosRepository não for fornecido', function(){
    expect(() => buscarLivrosPorNomeOuIsbnUseCase({})).toThrow(new AppError(AppError.dependencias));
  });

  test('Deve retonar um throw AppError se o campo  valor não for fornecido', async function(){
    const sut = buscarLivrosPorNomeOuIsbnUseCase({livrosRepository})
    await expect(() => sut({})).rejects.toThrow(new AppError(AppError.camposObrigatoriosAusentes));
  })
}); 