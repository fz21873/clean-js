const buscarUsuarioPorCpfUsecase = require("../src/application/buscar-usuario-por-cpf.usecase");

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
    expect(usuariosRepository.buscarPorCpf).toHaveBeenLastCalledWith(cpfDTO.Cpf);
    expect(usuariosRepository.buscarPorCpf).toHaveBeenCalledTimes(1);

   });
});