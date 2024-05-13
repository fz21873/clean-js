const buscarUsuarioPorCpfUsecase = require("../../src/application/UsuarioUsueCase/buscar-usuario-por-cpf.usecase");
const { AppError } = require("../../src/shared/errors");

describe('Buscar usuario por Cpf useCase', function(){
    const usuariosRepository = {
        buscarPorCpf: jest.fn()
    }
  test('Deve retornar um usuario em caso o Cpf esteja cadastrado', async function(){
    const cpfDTO = {
        Cpf: 'cpf_cadastrado'
    }
    const outputDTO = {
        id: 'qualquer_id',
        nome_completo :'qualquer_nome',
        cpf:'cpf_cadastrado',
        telefone:'qualquer_telefone',
        endereco:'qualquer_endereço',
        email:'qualquer_email'
      };
    
    usuariosRepository.buscarPorCpf.mockResolvedValue(outputDTO);
    const sut = buscarUsuarioPorCpfUsecase({usuariosRepository});
    const output = await sut(cpfDTO);

    expect(output.rigth).toEqual(outputDTO);
    expect(usuariosRepository.buscarPorCpf).toHaveBeenCalledWith(cpfDTO.Cpf);
    expect(usuariosRepository.buscarPorCpf).toHaveBeenCalledTimes(1);

   });
  
  test('Deve retornar null se não existir nenhum  usuário com o CPF informado', async function(){
    usuariosRepository.buscarPorCpf.mockResolvedValue(null);
    const cpfDTO = {
        Cpf: 'cpf_cadastrado'
    }

    const sut = buscarUsuarioPorCpfUsecase({usuariosRepository});
    output = await sut(cpfDTO);

    expect(output.rigth).toBeNull();
    expect(usuariosRepository.buscarPorCpf).toHaveBeenCalledWith(cpfDTO.Cpf);
    expect(usuariosRepository.buscarPorCpf).toHaveBeenCalledTimes(1);
  });

  test("Debe retornar um throw AppError se o usuariosRepository não for fornecido", function() {
    expect(() => buscarUsuarioPorCpfUsecase({})).toThrow(new AppError(AppError.dependencias));
  });

  test("Debe retornar um throw AppError se o campo CPF não for fornecido", async function() {
    const sut  = buscarUsuarioPorCpfUsecase({ usuariosRepository });
    await expect(() => sut({})).rejects.toThrow(new AppError(AppError.camposObrigatoriosAusentes));
  });

});