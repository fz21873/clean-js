const AppError = require("../src/shared/errors/AppError");

describe('AppError', function() {
  test('AppError é uma instancia de Error', function(){
    const appError = new AppError('error');
    expect(appError).toBeInstanceOf(Error);
  });

  test('AppError contém a mensagem correta', function(){
    const mensagem =  'Mensagem de eror';
    const appError = new AppError(mensagem);
    expect(appError.message).toBe(mensagem);
  });

});