const z = require('zod');

const cadastrarUsuarioValidator =   z.object({
   nome_completo: z.string({
      required_error:'Nome completo é obrigatório'
   }),
   cpf: z.string({
      required_error:'CPF é obrigatório'
   }).refine((value) => /^([0-9]{3}\.?[0-9]{3}\.[0-9]{3}\-?[0-9]{2})$/.test(value)),
   telefone: z.string({
      required_error:'Telefone é obrigatório'
   }),
   endereco: z.string({
      required_error:'Endereço é obrigatório'
   }),
   email: z.string({
      required_error:'Email é obrigatório'
   }).email({email:'Email debe ser valido'}),
});

const buscarPorCPFValidator =   z.object({
   cpf: z.string({
      required_error:'CPF é obrigatório'
   }).refine((value) => /^([0-9]{3}\.?[0-9]{3}\.[0-9]{3}\-?[0-9]{2})$/.test(value)),
});

const buscarPorEmailValidator =   z.object({
   email: z.string({
      required_error:'Email é obrigatório'
   }).email({email:'Email debe ser valido'}),
});

module.exports = {cadastrarUsuarioValidator,buscarPorCPFValidator, buscarPorEmailValidator};