// Importando os erros de validação da biblioteca yup
import { ValidationError } from 'yup';

// Criando a tipagem para os erros
interface Errors {
  // Aqui podemos receber qualquer coisa que seja uma string
  [key: string]: string;
}

// Criando a função para lidar com erros de validação
export default function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  // Percorrendo o array de erros
  err.inner.forEach(error => {
    // Obtendo a mensagem de erro
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}
