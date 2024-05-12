## Estruturas

## UsuariosRepository
[x] cadastrar({nome_completo,cpf,telefone,endereco,emai}) => Promise<void>
[] buscarPorCPF(cpf) => Promise<usuario | null>
[] existeCpf(cpf) => Promise<boolean>
[] exiteEmail(email) => Promise <boolean>


## LivrosRepository
[] cadastrar({nome,quantidade,autor,genero,ISBN}) => Promise<void>
[] existePorISBN(ISBN) => Promise<boolean>
[] buscarPorNomeOuISBN(valor) => Promise<array<livros>>