import styled from 'styled-components';

/* Criando a estilização para o container da mensagem toast */
export const Container = styled.div`
  /* Posicionando o container de toast no canto superior direito */
  position: absolute;
  right: 0;
  top: 0;
  padding: 30px;
  /* Escondendo incialmente */
  overflow: hidden;
`;
