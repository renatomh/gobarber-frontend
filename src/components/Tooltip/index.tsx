import React from 'react';

/* importando o estilo personalizado criado */
import { Container } from './styles';

/* Definindo a tipagem para o tooltip */
interface TooltipProps {
  title: string;
  className?: string;
}

/* Componente para apresentação de mensagens ao usuário */
const Tooltip: React.FC<TooltipProps> = ({
  title,
  className = '',
  children,
}) => {
  return (
    /* Criando o container com a classe definida e os dados */
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tooltip;
