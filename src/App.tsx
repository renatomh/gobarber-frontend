import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// Importando a estilização global
import GlobalStyle from './styles/globals';

// Importando os contextos (hooks) criados para a aplicação
import AppProvider from './hooks';

// Importando as rotas da aplicação
import Routes from './routes';

const App: React.FC = () => {
  return (
    // Aplicando as rotas da aplicação
    <Router>
      {/* Utilizando os contextos da aplicação para as rotas */}
      <AppProvider>
        <Routes />
      </AppProvider>

      {/* Aplicando a estilização global na aplicação */}
      <GlobalStyle />
    </Router>
  );
};

export default App;
