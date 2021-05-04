import React from 'react';
// Os erros do tipo "Module '"@testing-library/react"' has no exported member"
// Sendo apresentados não estão interferindo na execução dos testes
import { render, fireEvent, wait } from '@testing-library/react';
import SignIn from '../../pages/SignIn';

// Valor do histórico de navegação
const mockedHistoryPush = jest.fn();
// Valor da função de SignIn
const mockedSignIn = jest.fn();
// Valor de retorno para o toast
const mockedHAddToast = jest.fn();

// Criando o mock para todos os testes do arquivo
// Poderíamos colocar dentro de um 'it()' para utilização em um teste específico
jest.mock('react-router-dom', () => {
    return {
        // Definindo uma função vazia para os componentes usados pela página
        // E configurando ainda um valor de retorno
        useHistory: () => ({
            push: mockedHistoryPush,
        }),
        Link: ({ children }: { children: React.ReactNode }) => children,
    };
});

// Criando o mock para o 'hook' de autenticação
jest.mock('../../hooks/auth', () => {
    return {
        useAuth: () => ({
            signIn: mockedSignIn,
        }),
    }
});

// Mock para a função de toasts
jest.mock('../../hooks/toast', () => {
    return {
        useToast: () => ({
            addToast: mockedHAddToast,
        }),
    }
});

// Definindo a descrição para a suite de testes
describe('SignIn Page', () => {
    // Limpando as variáveis antes de cada execução
    beforeEach(() => {
        mockedHistoryPush.mockClear();
    });

    it('should be able to sign in', async () => {
        // Renderizando a página a ser testada e pegando os elementos necessários
        const { getByPlaceholderText, getByText } = render(<SignIn />);

        // Pegando os inputos pelo placeholder
        const emailField = getByPlaceholderText('E-mail');
        const passwordField = getByPlaceholderText('Senha');
        // Pegando o elemento pelo texto
        const buttonElement = getByText('Entrar');

        // Disparando um evento para alterar o elemento definido
        // Precisamos passar um evento com um 'target' e um 'value'
        fireEvent.change(emailField, { target: { value: 'johndoe@email.com' } });
        fireEvent.change(passwordField, { target: { value: '123456' } });
        // Clicando no botão
        fireEvent.click(buttonElement);

        // Esperando a execução do comando até um timeout
        await wait(() => {
            // Verificando se o retorno foi conforme o esperado
            expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
        });
    });

    it('should not be able to sign in with invalid credentials', async () => {
        // Renderizando a página a ser testada e pegando os elementos necessários
        const { getByPlaceholderText, getByText } = render(<SignIn />);

        // Pegando os inputos pelo placeholder
        const emailField = getByPlaceholderText('E-mail');
        const passwordField = getByPlaceholderText('Senha');
        // Pegando o elemento pelo texto
        const buttonElement = getByText('Entrar');

        // Disparando um evento para alterar o elemento definido
        // Precisamos passar um evento com um 'target' e um 'value'
        fireEvent.change(emailField, { target: { value: 'not-valid-email' } });
        fireEvent.change(passwordField, { target: { value: '123456' } });
        // Clicando no botão
        fireEvent.click(buttonElement);

        // Esperando a execução do comando até um timeout
        await wait(() => {
            // Verificando se o retorno foi conforme o esperado
            expect(mockedHistoryPush).not.toHaveBeenCalled();
        });
    });

    it('should display an error if login fails', async () => {
        // Mocando a implementação do 'hook' de autenticação
        mockedSignIn.mockImplementation(() => {
            // Definindo que a função 'SignIn' do 'useToast' retornará um erro
            throw new Error();
        });

        // Renderizando a página a ser testada e pegando os elementos necessários
        const { getByPlaceholderText, getByText } = render(<SignIn />);

        // Pegando os inputos pelo placeholder
        const emailField = getByPlaceholderText('E-mail');
        const passwordField = getByPlaceholderText('Senha');
        // Pegando o elemento pelo texto
        const buttonElement = getByText('Entrar');

        // Disparando um evento para alterar o elemento definido
        // Precisamos passar um evento com um 'target' e um 'value'
        fireEvent.change(emailField, { target: { value: 'johndoe@email.com' } });
        fireEvent.change(passwordField, { target: { value: '123456' } });
        // Clicando no botão
        fireEvent.click(buttonElement);

        // Esperando a execução do comando até um timeout
        await wait(() => {
            // Verificando se o retorno foi conforme o esperado
            expect(mockedHAddToast).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: 'error',
                })
            );
        });
    });
});
