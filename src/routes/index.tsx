import React from 'react';
import { Switch } from 'react-router-dom';

// importando o componente de rota personalizado criado
import Route from './Route';

// Importando as páginas criadas
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';

// Criando o componente para o roteamento
const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={SignUp} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
    </Switch>
  );
};

export default Routes;
