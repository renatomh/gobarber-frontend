import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  > header {
    height: 144px;
    background: #28262e;

    display: flex;
    align-items: center;

    div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;

      svg {
        color: #999591;
        width: 24px;
        height: 24px;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // Centralizando o conteúdo na página
  margin: -176px auto 0;

  width: 100%;
  max-width: 700px;

  form {
    // Caso queiramos adicionar mais botões, é necessário diminuir essa margem
    margin: 80px 0;
    width: 340px;
    text-align: center;
    // Permitindo a centralização do 'AvatarInput'
    display: flex;
    flex-direction: column;

    h1 {
      margin-bottom: 24px;
      font-size: 20px;
      text-align: left;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }
`;

export const AvatarInput = styled.div`
  margin-bottom: 26px;
  position: relative;
  // Centralizando no 'Form'
  align-self: center;

  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }

  // Estilizando o ícone da câmera
  label {
    position: absolute;
    width: 48px;
    height: 48px;
    background: #ff9000;
    border-radius: 50%;
    border: 0;
    // Posicionando no canto inferior direito do 'AvatarInput'
    right: 0;
    bottom: 0;
    // Delay para mudança de cover ao passar o mouse por cima
    transition: background-color 0.2s;
    // Centralizando o ícone no botão
    display: flex;
    align-items: center;
    justify-content: center;
    // Habilitando o cursor após a utilização como estilo do input
    cursor: pointer;

    // Escondendo o display padrão de input para os arquivos
    input {
      display: none;
    }

    svg {
      width: 20px;
      height: 20px;
      color: #312e38;
    }

    &:hover {
      background: ${shade(0.2, '#FF9000')};
    }
  }
`;
