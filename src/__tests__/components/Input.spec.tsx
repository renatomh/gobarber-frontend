import React from 'react';
// Os erros do tipo "Module '"@testing-library/react"' has no exported member"
// Sendo apresentados não estão interferindo na execução dos testes
import { render, fireEvent, wait } from '@testing-library/react';
import Input from '../../components/Input';

// Criando o mock para todos os testes do arquivo
jest.mock('@unform/core', () => {
    return {
        // Definindo uma função vazia para os componentes
        // E configurando ainda um valor de retorno
        useField: () => {
            return {
                fieldName: 'email',
                defaultValue: '',
                error: '',
                registerField: jest.fn(),
            };
        },
    };
});

// Definindo a descrição para a suite de testes
describe('Input Component', () => {
    it('should be able to render an input', () => {
        // Renderizando o componente a ser testado e pegando os elementos necessários
        const { getByPlaceholderText } = render(
            <Input name="email" placeholder="E-mail" />,
        );

        // Verificando se o retorno foi conforme o esperado
        expect(getByPlaceholderText('E-mail')).toBeTruthy();
    });

    it('should render highlight on input focus', async () => {
        // Renderizando o componente a ser testado e pegando os elementos necessários
        const { getByPlaceholderText, getByTestId } = render(
            <Input name="email" placeholder="E-mail" />,
        );

        // Pegando o elemento a ser testado
        const inputElement = getByPlaceholderText('E-mail');
        const containerElement = getByTestId('input-container');

        // Disparando um evento de foco (clicar) no componente
        fireEvent.focus(inputElement);
        // Esperando a execução do comando até um timeout
        await wait(() => {
            // Verificando se o retorno foi conforme o esperado
            expect(containerElement).toHaveStyle('border-color: #ff9000;');
            expect(containerElement).toHaveStyle('color: #ff9000;');
        });

        // Disparando um evento de retirar o foco (clicar fora) do componente
        fireEvent.blur(inputElement);
        // Esperando a execução do comando até um timeout
        await wait(() => {
            // Verificando se o retorno foi conforme o esperado
            expect(containerElement).not.toHaveStyle('border-color: #ff9000;');
            expect(containerElement).not.toHaveStyle('color: #ff9000;');
        });
    });

    it('should keep border highlight when input filled', async () => {
        // Renderizando o componente a ser testado e pegando os elementos necessários
        const { getByPlaceholderText, getByTestId } = render(
            <Input name="email" placeholder="E-mail" />,
        );

        // Pegando o elemento a ser testado
        const inputElement = getByPlaceholderText('E-mail');
        const containerElement = getByTestId('input-container');

        // Disparando o evento de preencher o componente
        fireEvent.change(inputElement, {
            target: { value: 'johndoe@example.com' },
        });

        // Disparando um evento de retirar o foco (clicar fora) do componente
        fireEvent.blur(inputElement);
        // Esperando a execução do comando até um timeout
        await wait(() => {
            // Verificando se o retorno foi conforme o esperado
            expect(containerElement).toHaveStyle('color: #ff9000;');
        });
    });
});
