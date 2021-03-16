import React, { useEffect } from 'react';
// Importando os ícones para os toasts
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from 'react-icons/fi';

// Importando o contexto para o toast
import { ToastMessage, useToast } from '../../../hooks/toast';

// Importando os estilos personalizados
import { Container } from './styles';

// Definindo a tipagem para as propriedades do toast
interface ToastProps {
  message: ToastMessage;
  style: object;
}

// Definindo os ícones para cada tipo de toast
const icons = {
  info: <FiInfo size={24} />,
  success: <FiCheckCircle size={24} />,
  error: <FiAlertCircle size={24} />,
};

// Criando o componente para o toast
const Toast: React.FC<ToastProps> = ({ message, style }) => {
  // Obtendo a função para remover o toast
  const { removeToast } = useToast();

  // Atualizando a visualização assim que um novo toast surgir em tela
  useEffect(() => {
    // Definindo um timer para fechar o toast automaticamente (duração de 3s)
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    // Interrompendo o timeout caso o toast seja fechado pelo usuário
    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, message.id]);

  return (
    // Criando o toast e definindo o tipo, a descrição e o estilo
    <Container
      type={message.type}
      hasDescription={!!message.description}
      style={style}
    >
      {/* Definindo o ícone para o toast (o padrão será 'info' caso nada seja passado) */}
      {icons[message.type || 'info']}
      <div>
        {/* Definindo o título e a descrição (caso presente) para o toast */}
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      {/* Botão para fechar o toast, chamando a função apropriada */}
      <button type="button" onClick={() => removeToast(message.id)}>
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;
