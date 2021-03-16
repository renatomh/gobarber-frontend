import React, { createContext, useCallback, useContext, useState } from 'react';

// Importando a comunicação com a API
import api from '../services/api';

// Criando a tipagem para o estado de autenticação
interface AuthState {
  token: string;
  user: object;
}

// Criando a tipagem para as credenciais a serem recebidas
interface SignInCredentials {
  email: string;
  password: string;
}

// Tipagem para o contexto de autenticação
interface AuthContextData {
  user: object;
  // Definindo os métodos do contexto de autenticação
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

// Criando o contexto de autenticação do usuário e iniciando como vazio
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Criando o componente para o provedor de autenticação
const AuthProvider: React.FC = ({ children }) => {
  // Criando o estado para os dados do contexto de autenticação
  const [data, setData] = useState<AuthState>(() => {
    // Inicializando os dados com os valores armazendos localmente no navegador
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    // Verificando se há dados armazenados no navegador
    if (token && user) {
      // Caso haja, retornamos os dados par o estado
      return { token, user: JSON.parse(user) };
    }

    // Caso nada seja retornado, inicializamos o estado como vazio
    return {} as AuthState;
  });

  // Função para realizar o login na API
  const signIn = useCallback(async ({ email, password }) => {
    // Fazendo a chamada à API com os dados recebidos
    const response = await api.post('sessions', {
      email,
      password,
    });
    // Pegando os dados retornados na resposta da chamada à API
    const { token, user } = response.data;

    // Salvando os dados obtidos no armazenamento local do navegador
    // (Colocando os prefixos para não confundir com os outros tokens no mesmo host)
    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));

    // Armazenando os dados no estado do contexto da aplicação
    setData({ token, user });
  }, []);

  // Função para realizar o logout
  const signOut = useCallback(() => {
    // Removendo os dados do armazenamento local do navegador
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');

    // Atualizando o estado do contexto de autenticação
    setData({} as AuthState);
  }, []);

  return (
    // Exportando as propriedades e funções do contexto
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Definindo a função para utilizar o contexto de autenticação
function useAuth(): AuthContextData {
  // Definindo o contexto a ser utilizado
  const context = useContext(AuthContext);
  // Verificando se o contexto ainda não foi criado
  if (!context) {
    // Caso não tenha sido criado, informa o erro (deve ser utilizado no App.tsx)
    throw new Error('useAuth must be used within an AuthProvider');
  }
  // Caso contrário, retorna o contexto
  return context;
}

export { AuthProvider, useAuth };
