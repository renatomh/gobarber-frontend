import React, { ButtonHTMLAttributes } from 'react';

/* Importando os estilos personalizados criados para o componente */
import { Container } from './styles';

/* Aqui criamos uma interface (tipagem) vazia, assim, podemos definir somente como sendo 'type' */
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /* Adicionando outras propriedades ao botão */
  loading?: boolean;
};

/* Criando o componente do botão para reaproveitar em diversas páginas da aplicação */
/* Recebemos ainda todas as propriedades passadas */
const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => {
  return (
    /* Definindo os atributos do botão */
    <Container type="button" {...rest}>
      {/* Caso esteja carregando, exibimos uma mensagem, caso contrário, definimos o conteúdo/texto do botão */}
      {loading ? 'Carregando...' : children}
    </Container>
  );
};

export default Button;
