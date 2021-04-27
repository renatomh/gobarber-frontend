import React, { useCallback, useRef } from 'react';
// Importando os ícones do Feather Icon
import { FiLock } from 'react-icons/fi';
// Biblioteca da Rocketseat para trabalhar com formulários com melhor desempenho
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
// Biblioteca para validação de dados do formulário
import * as Yup from 'yup';
import { useHistory, useLocation } from 'react-router-dom';

// Importando os contextosdos toasts
import { useToast } from '../../hooks/toast';

// Função para obter a lista de mensagens de erros
import getValidationErrors from '../../utils/getValidationErrors';

// Importando a logo
import logoImg from '../../assets/logo.svg';

// Importando os componentes criados
import Input from '../../components/Input';
import Button from '../../components/Button';

// Importando a estilização criada para a página
import { Container, Content, AnimationContainer, Background } from './styles';
import api from '../../services/api';

// Definindo a tipagem para o formulário com os dados
interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

// Criando o componente para fazer o login no sistema
const ResetPassword: React.FC = () => {
  // Criando a referência para o formulário
  const formRef = useRef<FormHandles>(null);

  // Pegando os métodos dos contextos de toasts
  const { addToast } = useToast();

  // Pegando o histórico das rotas
  const history = useHistory();
  // Pegando o endereço/URL da rota
  const location = useLocation();

  // Função para lidar com o submit do formulário
  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        // Zerando os erros que possam advir de preenchimentos de inputs passados
        formRef.current?.setErrors({});

        // Definindo o schema de validação
        const schema = Yup.object().shape({
          password: Yup.string().required('Senha obrigatória'),
          // Verificando se a confirmação de senha está correta
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password')],
            'As senhas não coincidem'
          )
        });

        // Validando os dados de acordo com o schema criado
        await schema.validate(data, {
          // Aqui definimos que todos os erros encontrados serão retornados
          abortEarly: false,
        });

        // Pegando os dados para a chamada à API
        const { password, password_confirmation } = data;
        const token = location.search.replace('?token=', '');

        // Verificando se o token foi informado
        if (!token) {
          throw new Error();
        }

        // Fazendo a chamada à API para a redefinição da senha
        await api.post('/password/reset/', {
          password,
          password_confirmation,
          token
        });
        addToast({
          type: 'success',
          title: 'Senha redefinida com sucesso',
          description: 'Agora você já pode realizar o login com a nova senha.',
        });

        history.push('/');
      } catch (err) {
        // Caso ocorra algum erro, verificamos se foi na validação dos dados
        if (err instanceof Yup.ValidationError) {
          // Obtendo os erros de validação retornados
          const errors = getValidationErrors(err);
          // Definindo os erros no formRef
          formRef.current?.setErrors(errors);
          return;
        }

        // Caso não tenha sido, criamos um toast para informar ao usuário
        addToast({
          type: 'error',
          title: 'Erro ao redefinir senha',
          description: 'Ocorreu um erro ao redefinir sua senha, tente novamente.',
        });
      }
    },
    [addToast, history, location.search],
  );

  return (
    <Container>
      <Content>
        {/* Criando o container animado com o conteúdo */}
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          {/* Definindo o formulário para entrada dos dados */}
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Redefinir senha</h1>

            {/* Campo para entrar com a senha */}
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Nova Senha"
            />

            {/* Campo para confirmar a senha */}
            <Input
              name="password_confirmation"
              icon={FiLock}
              type="password"
              placeholder="Confirmar Senha"
            />

            <Button type="submit">Redefinir senha</Button>
          </Form>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
};

export default ResetPassword;
