import React from 'react';

/* Importando os contextos de autenticação e dos toasts */
import { AuthProvider } from './auth';
import { ToastProvider } from './toast';

/* Centralizando/englobando os contextos/hooks criados para a aplicação */
const AppProvider: React.FC = ({ children }) => {
  return (
    /* Criando o contexto de autenticação */
    <AuthProvider>
      {/* Criando o contexto de toasts */}
      <ToastProvider>{children}</ToastProvider>
    </AuthProvider>
  );
};

export default AppProvider;
