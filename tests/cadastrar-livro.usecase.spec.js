
const cadastrarLivroUsecase = require("../src/application/LivrosUseCase/cadastrar-livro.usecase");
const { Either, AppError } = require("../src/shared/errors");

describe('Cadastra Livro Usecase', function(){
    const livrosRepository = {
        cadastrar: jest.fn(),
    }
    test('Deve poder cadastrar um livro', async function(){
        const livroDTO ={
            nome: 'nome_valido',
            quantidade:'quantidade_valido',
            autor: 'autor_valido',
            genero: 'genero_valido',
            ISBN: 'ISBN_valido'
        }
        const sut = cadastrarLivroUsecase({livrosRepository});
        const output = await sut(livroDTO);

        expect(output.rigth).toBeNull();
        expect(livrosRepository.cadastrar).toHaveBeenCalledWith(livroDTO);
        expect(livrosRepository.cadastrar).toHaveBeenCalledTimes(1);
    });

    test('Deve retornar um throw AppErro se o livrosRepository não foi fornecido', function() {
        expect(() => cadastrarLivroUsecase({})).toThrow(new AppError(AppError.dependencias));
    });
})