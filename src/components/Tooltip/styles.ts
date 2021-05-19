import styled from 'styled-components';

/* Estilizando o container do tooltip */
export const Container = styled.div`
  /* Toda posição absoluta dentro desse container será relativa ao próprio container */
  position: relative;

  span {
    width: 160px;
    background: #ff9000;
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    /* Animando a aparição do item */
    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden;

    /* Posicionando com relação ao container */
    position: absolute;
    /* Posicionando um pouco acima do ícone */
    bottom: calc(100% + 12px);
    /* Centralizando, alinhando com o container */
    left: 50%;
    transform: translateX(-50%);

    color: #312e38;

    /* Criando a setinha do tooltip */
    &::before {
      content: '';
      border-style: solid;
      border-color: #ff9000 transparent;
      /* Definindo o formato do triângulo */
      border-width: 6px 6px 0 6px;
      top: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  /* Mostrando apenas quando passamos o mouse por cima do ícone */
  &:hover span {
    visibility: visible;
    opacity: 1;
  }
`;
