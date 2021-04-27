import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

// Pegando a imagem de fundo
import signInBackground from '../../assets/sign-in-background.png';

// Container principal para a tela
export const Container = styled.div`
  // Definindo que ocupará 100% do viewport height
  height: 100vh;

  display: flex;
  // Fazendo com que o content e o background ocupem o tamanho tottal da página
  align-items: stretch;
`;

// Área com o conteúdo para a página
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  // Poderíamos substituir as duas linhas abaixo por 'place-content: center;'
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 700px;
`;

// Criando a animação para o conteúdo aparecer a partir da esquerda
const appearFromLeft = keyframes`
  // Definindo a origem
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  // E o destino
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

// Definindo o container animado (com uma pequena transição de deslocamento no começo)
export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  // Definindo a animação para o container
  animation: ${appearFromLeft} 1s;

  // Estilizando o formulário do container
  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    // Distanciando um pouco o h1 do conteúdo abaixo dele
    h1 {
      margin-bottom: 24px;
    }
  }

    // Definindo o estilo para o 'Esqueci minha senha'
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

  // Estilizando somente as âncoras que vem diretamente dentro do content (não dentro do form)
  > a {
    color: #ff9000;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }
`;

// Definindo a imagem de fundo
export const Background = styled.div`
  flex: 1;
  background: url(${signInBackground}) no-repeat center;
  // Cobrindo o tamanho disponível para o item
  background-size: cover;
`;
