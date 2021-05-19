import { renderHook, act } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';

import { AuthProvider, useAuth } from '../../hooks/auth';
import api from '../../services/api';

// Criando o mock para todos os testes do arquivo
const apiMock = new MockAdapter(api);

// Definindo a descrição para a suite de testes
describe('Auth Hook', () => {
  it('should be able to sign in', async () => {
    // Definindo o retorno da API mocada
    const apiResponse = {
      user: {
        id: 'user123',
        name: 'John Doe',
        email: 'johndoe@example.com.br',
      },
      token: 'token-123',
    };
    apiMock.onPost('sessions').reply(200, apiResponse);

    // Criando a verificação para as chamadas ao 'setItem' do 'localStorage'
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    // Renderizando o hook a ser testado e pegando os elementos necessários
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      // Definindo o provider de autenticação para o hook
      wrapper: AuthProvider,
    });

    // Chamando a função de Sign In com as credenciais de acesso
    result.current.signIn({
      email: 'johndoe@example.com.br',
      password: '123456',
    });

    // Esperando a execução do comando até a próxima atualização
    await waitForNextUpdate();

    // Verificando se o retorno foi conforme o esperado
    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:token',
      apiResponse.token,
    );
    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(apiResponse.user),
    );
    expect(result.current.user.email).toEqual('johndoe@example.com.br');
  });

  it('should restore saved data from storage when auth inits', () => {
    // Implementando o mock para as chamadas ao 's=getItem' do 'localStorage'
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      switch (key) {
        case '@GoBarber:token':
          return 'token-123';
        case '@GoBarber:user':
          return JSON.stringify({
            id: 'user-123',
            name: 'John Doe',
            email: 'johndoe@example.com.br',
          });
        default:
          return null;
      }
    });

    // Renderizando o hook a ser testado e pegando os elementos necessários
    const { result } = renderHook(() => useAuth(), {
      // Definindo o provider de autenticação para o hook
      wrapper: AuthProvider,
    });

    // Verificando se o retorno foi conforme o esperado
    expect(result.current.user.email).toEqual('johndoe@example.com.br');
  });

  it('should be able to sign out', async () => {
    // Implementando o mock para as chamadas ao 's=getItem' do 'localStorage'
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      switch (key) {
        case '@GoBarber:token':
          return 'token-123';
        case '@GoBarber:user':
          return JSON.stringify({
            id: 'user-123',
            name: 'John Doe',
            email: 'johndoe@example.com.br',
          });
        default:
          return null;
      }
    });

    // Criando a verificação para as chamadas ao 'removeItem' do 'localStorage'
    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

    // Renderizando o hook a ser testado e pegando os elementos necessários
    const { result } = renderHook(() => useAuth(), {
      // Definindo o provider de autenticação para o hook
      wrapper: AuthProvider,
    });

    // Esperando a execução de mudança de estado
    act(() => {
      // Fazendo a chamada à função de Sign Out
      result.current.signOut();
    });

    // Verificando se o retorno foi conforme o esperado
    expect(removeItemSpy).toHaveBeenCalledTimes(2);
    expect(result.current.user).toBeUndefined();
  });

  it('should be able to update user data', async () => {
    // Criando a verificação para as chamadas ao 'setItem' do 'localStorage'
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    // Renderizando o hook a ser testado e pegando os elementos necessários
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      // Definindo o provider de autenticação para o hook
      wrapper: AuthProvider,
    });

    // Definindo o objeto com os dados do usuário
    const user = {
      id: 'user123',
      name: 'John Doe',
      email: 'johndoe@example.com.br',
      avatar_url: 'image-test.jpg',
    };

    // Esperando a execução de mudança de estado
    act(() => {
      // Fazendo a chamada à função de atualização de usuário
      result.current.updateUser(user);
    });

    // Verificando se o retorno foi conforme o esperado
    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(user),
    );
    expect(result.current.user).toEqual(user);
  });
});
