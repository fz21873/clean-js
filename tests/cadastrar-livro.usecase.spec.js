
const cadastrarLivroUsecase = require("../src/application/LivrosUseCase/cadastrar-livro.usecase");
const { Either, AppError } = require("../src/shared/errors");

describe('Cadastra Livro Usecase', function(){
    const livrosRepository = {
        cadastrar: jest.fn(),
        existePorISBN: jest.fn(),
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

    test('Deve retornar um throw AppError se o livrosRepository não foi fornecido', function() {
        expect(() => cadastrarLivroUsecase({})).toThrow(new AppError(AppError.dependencias));
    });

    test('Debe retornar um throw AppError se os campos obrigatorios não forem fornecido', async function(){
        const sut = cadastrarLivroUsecase({livrosRepository});
        await expect(() => sut({})).rejects.toThrow(new AppError(AppError.camposObrigatoriosAusentes));
    });

    test('Deve retornar um Either.Left.valorJaCadastrado se o ISBN já foi cadastrado', async function(){
       livrosRepository.existePorISBN.mockResolvedValue(true);
       const livroDTO ={
        nome: 'nome_valido',
        quantidade:'quantidade_valido',
        autor: 'autor_valido',
        genero: 'genero_valido',
        ISBN: 'ISBN_ja_cadastrado'
      };

      const sut = cadastrarLivroUsecase({ livrosRepository });
      const output = await sut(livroDTO);

      expect(output.left).toEqual(Either.valorJaCadastrado('ISBN'));
      expect(livrosRepository.existePorISBN).toHaveBeenCalledWith(livroDTO.ISBN);
      expect(livrosRepository.existePorISBN).toHaveBeenCalledTimes(1);
      
    })
})