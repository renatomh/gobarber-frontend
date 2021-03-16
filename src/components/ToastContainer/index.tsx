import React from 'react';
// Biblioteca para trablahar com animações ao apresentar e retirar um elemento da tela
import { useTransition } from 'react-spring';

// importando o componente do Toast
import Toast from './Toast';

// Importando a interface (tipagem) das mensagens para os toasts
import { ToastMessage } from '../../hooks/toast';

// Importando o estilo personalizado criado
import { Container } from './styles';

// Definindo a tipagem para as propriedades do container
interface ToastContainerProps {
  messages: ToastMessage[];
}

// Criando o componente do container para o Toast
const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  // Criando o objeto de mensagens com transições
  const messagesWithTransitions = useTransition(
    messages,
    message => message.id,
    {
      // Definindo a origem (de onde virá o elemento)
      from: { right: '-120%', opacity: 0 },
      // Definindo o local onde o elemento estará presente na tela
      enter: { right: '0%', opacity: 1 },
      // Definindo o destino final (para onde irá o elemento ao final)
      leave: { right: '-120%', opacity: 0 },
    },
  );

  return (
    // Mapeando todas as mensagens para os toasts a serem apresentados
    <Container>
      {messagesWithTransitions.map(({ item, key, props }) => (
        // Passando o ID, a mensagem e o estilo (animação)
        <Toast key={key} style={props} message={item} />
      ))}
    </Container>
  );
};

export default ToastContainer;
