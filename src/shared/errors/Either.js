/**
 * @description ATENÇÃO, esta classe não deve ser instanciada diretamente, use um dos metodos Left ou Rigth.
 */

module.exports = class Either{
    constructor(left, rigth){
    this.left = left;
    this.rigth = rigth;
    }

    static Left(left){
      return new Either(left,null);
    }

    static Rigth(rigth){
      return new Either(null,rigth);
    }

    static valorJaCadastrado(valor){
        return {message: `${valor} já cadastrado.`};
    }
};