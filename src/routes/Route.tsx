import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';

/* Importando o contexto de autorização */
import { useAuth } from '../hooks/auth';

/* Criando a tipagem para as propriedades das rotas */
interface RouteProps extends ReactDOMRouteProps {
  /* Criando uma propriedade para verificar se a página é pública ou privada
  A página prvada somente pode ser acessada por usuários autenticados */
  isPrivate?: boolean;
  component: React.ComponentType;
}

/* Criando o componente personalizado de rotas */
const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      /* Aqui temos a verificação de páginas privadas */
      render={({ location }) => {
        /* Caso seja uma página privada e o usuário esteja autenticado */
        /* Ou seja uma página pública e o usuário não esteja autenticado */
        return isPrivate === !!user ? (
          /* Enviamos para a rota selecionada */
          <Component />
        ) : (
          /* Caso contrário redirecionamos o usuário */
          <Redirect
            to={{
              pathname:
                /* Se for uma página privada e o usuário não estiver autenticado, mandamos para o login */
                isPrivate
                  ? '/'
                  : /* Se for uma página pública e o usuário estiver autenticado, mandamos para dashboard */
                    '/dashboard',
              /* Mantendo o histórico de rotas */
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
