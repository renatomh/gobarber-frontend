import styled, { css } from 'styled-components';

/* Importando o componetne do tooltip criado */
import Tooltip from '../Tooltip';

/* Criando a interface para as propriedades do container do input */
interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

/* Estilizando o campo de container que abrangerá o input */
export const Container = styled.div<ContainerProps>`
  background: #232129;
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  /* Criando a borda que pode ser recolorida em caso de erro */
  border: 2px solid #232129;
  color: #666360;

  display: flex;
  align-items: center;

  /* Distanciando verticalmente os containers que vierem a seguir */
  & + div {
    margin-top: 8px;
  }

  /* Verificando se foi informado um erro pelas propriedades e mudando a cor da borda */
  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  /* Verificando se o input foi clicado pelas propriedades e mudando a cor da borda */
  ${props =>
    props.isFocused &&
    css`
      color: #ff9000;
      border-color: #ff9000;
    `}

  /* Verificando se o input foi preenchido pelas propriedades e mudando a cor do ícone */
  ${props =>
    props.isFilled &&
    css`
      color: #ff9000;
    `}

  /* Definindo os atributos do input */
  input {
    /* Ocupando todo o espaço disponível */
    flex: 1;
    background: transparent;
    border: 0;
    color: #f4ede8;

    &::placeholder {
      color: #666360;
    }
  }

  /* Caso haja um ícone, colocaremos um espaço entre o ícone eo o input */
  svg {
    margin-right: 16px;
  }
`;

/* Estilização para o componente do tooltip de erro */
export const Error = styled(Tooltip)`
  height: 20px;
  /* Impedindo que o texto do input fique junto ao ícone e tooltip de erro */
  margin-left: 16px;

  /* Deixando o ícone bem próxima à extremidade lateral */
  svg {
    margin: 0;
  }

  /* Definindo as cores para o tooltip de erro */
  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
