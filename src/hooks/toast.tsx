import React, { createContext, useCallback, useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';

import ToastContainer from '../components/ToastContainer';

// Definindo o formato para as mensagns de toast
export interface ToastMessage {
  id: string;
  type?: 'info' | 'success' | 'error';
  title: string;
  description?: string;
}

// Definindo a tipagem para os dados do contexto
interface ToastContextData {
  // Teremos uma função para adicionar e uma para remover toasts
  addToast(messages: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

// Criando o contexto para o toast (inicializando como vazio)
const ToastContext = createContext<ToastContextData>({} as ToastContextData);

// Criando o componente para o toast
const ToastProvider: React.FC = ({ children }) => {
  // Criando o estado para armazenar as mensagens a serem apresentadas nos toasts
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  // Função para adicionar um toast
  const addToast = useCallback(
    // Definindo o tipo omitindo o ID (que será gerado, não criado pelo usuário)
    ({ type, title, description }: Omit<ToastMessage, 'id'>) => {
      // Gerando um ID único para o toast
      const id = uuid();
      // Instanciando a mensagem de toast
      const toast = {
        id,
        type,
        title,
        description,
      };
      // Salvando a mensagem criada no estado (juntos às mensagens antigas do estado)
      setMessages(state => [...state, toast]);
    },
    [],
  );

  // Função para remover um toast
  const removeToast = useCallback((id: string) => {
    // Simplesmente filtramos o estado das mensagens para retornar somente as que não tiverem o ID especificdo
    setMessages(state => state.filter(message => message.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {/* Aqui é onde serão mostrados os toasts */}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

// Função para utilizar o contexto de toasts
function useToast(): ToastContextData {
  // Definindo o contexto a ser utilizado
  const context = useContext(ToastContext);
  // Verificando se o contexto ainda não foi criado
  if (!context) {
    // Caso não tenha sido criado, informa o erro (deve ser utilizado no App.tsx)
    throw new Error('useToast must be used within an ToastProvider');
  }
  // Caso contrário, retorna o contexto
  return context;
}

export { ToastProvider, useToast };
