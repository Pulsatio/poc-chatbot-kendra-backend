
namespace ValidatorMessage {
  export function required(param?: string) {
    return (param ? `${param} es ` : '') + 'requerido';
  }

  export const notMail = 'e-mail invalido';

  export const incorrectPattern = 'Formato incorrecto'

  export function isNotString(param?: string) {
    return param ? `${param} ` : '' + ' no es string';
  }

  export const isNotNumeric = 'Es requerido un número';

  export const isNotValidOption = 'No es una opción válida';
}

export default ValidatorMessage;