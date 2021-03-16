import styled from 'styled-components';
import { shade } from 'polished';

// Estilizando o botão
export const Container = styled.button`
  background: #ff9000;
  height: 56px;
  border-radius: 10px;
  border: 0;
  // Deixando o padding somente nas laterais
  padding: 0 16px;
  color: #312e38;
  width: 100%;
  font-weight: 500;
  // Distanciando dos itens que estiverem acima dele
  margin-top: 16px;
  // Definindo a transição para background
  transition: background-color 0.2s;

  // Escurecendo um pouco o botão ao passar o mouse sobre ele
  &:hover {
    background: ${shade(0.2, '#ff9000')};
  }
`;
