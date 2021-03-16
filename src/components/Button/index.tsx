import React, { ButtonHTMLAttributes } from 'react';

// Importando os estilos personalizados criados para o componente
import { Container } from './styles';

// Aqui criamos uma interface (tipagem) vazia, assim, podemos definir somente como sendo 'type'
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

// Criando o componente do botão para reaproveitar em diversas páginas da aplicação
// Recebemos ainda todas as propriedades passadas
const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    // Definindo os atributos do botão
    <Container type="button" {...rest}>
      {/* Definindo o conteúdo/texto do botão */}
      {children}
    </Container>
  );
};

export default Button;
