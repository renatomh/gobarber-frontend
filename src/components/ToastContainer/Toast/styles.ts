import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

/* Tipando as propriedades a serem recebidas para personalizar a estilização */
interface ContainerProps {
  /* O tipo poderá ser 'info', 'success' ou 'error' */
  type?: 'info' | 'success' | 'error';
  hasdescription: number;
}

/* Criando as variações para os toasts de diferentes tipos */
const toastTypeVariations = {
  /* Toasts de informação */
  info: css`
    background: #ebf8ff;
    color: #3172b7;
  `,

  /* Toasts de sucesso */
  success: css`
    background: #e6fffa;
    color: #2e656a;
  `,

  /* Toasts de erro */
  error: css`
    background: #fddede;
    color: #c53030;
  `,
};

/* Criando a estilização para o toast */
/* Devemos utilizar o 'animated.div' para aplicar as animações de transição do 'react-spring' */
export const Container = styled(animated.div)<ContainerProps>`
  width: 360px;

  /* Posição relativa, pois a absoluta já está no container do toast */
  position: relative;
  padding: 16px 30px 16px 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

  display: flex;

  /* Caso haja mais de um toast no container, espaçamos a partir do segundo */
  & + div {
    margin-top: 8px;
  }

  /* Definindo a cor e o background em função do tipo de toast */
  /* 'info' será o padrão caso nada seja passado */
  ${props => toastTypeVariations[props.type || 'info']}

  /* Estilizando o ícone do toast (que está diretamente nele, não em um botão dele) */
  > svg {
    margin: 4px 12px 0 0;
  }

  /* Definindo a div para a descrição do toast */
  div {
    flex: 1;

    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
    }
  }

  /* Definindo o botao para fechar o toast */
  button {
    /* Aqui enviamos o botão bem para a direita */
    position: absolute;
    right: 16px;
    top: 19px;
    opacity: 0.6;
    border: 0;
    background: transparent;
    /* Herdando a cor do container */
    color: inherit;
  }

  /* Caso nehuma descrição tenha sido passada, definimos o alinhamento e a margem do ícone */
  ${props =>
    !props.hasdescription &&
    css`
      align-items: center;

      svg {
        margin-top: 0;
      }
    `}
`;
