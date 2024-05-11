module.exports = class AppError extends Error{
    constructor(message){
        super(message)
        this.message = message;
    }
    static dependencias = 'Alguma dependencia obrigatoria não foi fornecida'
    
}