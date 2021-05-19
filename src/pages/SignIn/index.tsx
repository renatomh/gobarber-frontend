import React, { useCallback, useRef } from 'react';
/* Importando os ícones do Feather Icon */
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
/* Biblioteca da Rocketseat para trabalhar com formulários com melhor desempenho */
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
/* Biblioteca para validação de dados do formulário */
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

/* Importando os contextos de autenticação e dos toasts */
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

/* Função para obter a lista de mensagens de erros */
import getValidationErrors from '../../utils/getValidationErrors';

/* Importando a logo */
import logoImg from '../../assets/logo.svg';

/* Importando os componentes criados */
import Input from '../../components/Input';
import Button from '../../components/Button';

/* Importando a estilização criada para a página */
import { Container, Content, AnimationContainer, Background } from './styles';

/* Definindo a tipagem para o formulário com os dados */
interface SignInFormData {
  email: string;
  password: string;
}

/* Criando o componente para fazer o login no sistema */
const SignIn: React.FC = () => {
  /* Criando a referência para o formulário */
  const formRef = useRef<FormHandles>(null);

  /* Pegando os métodos dos contextos de autenticação e toasts */
  const { signIn } = useAuth();
  const { addToast } = useToast();

  /* Pegando o histórico das rotas */
  const history = useHistory();

  /* Função para lidar com o submit do formulário */
  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        /* Zerando os erros que possam advir de preenchimentos de inputs passados */
        formRef.current?.setErrors({});

        /* Definindo o schema de validação */
        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail obrigatório'),
          password: Yup.string().required('Senha obrigatória'),
        });

        /* Validando os dados de acordo com o schema criado */
        await schema.validate(data, {
          /* Aqui definimos que todos os erros encontrados serão retornados */
          abortEarly: false,
        });

        /* Chamando a função para fazer o log in no sistema */
        await signIn({
          email: data.email,
          password: data.password,
        });

        history.push('/dashboard');
      } catch (err) {
        /* Caso ocorra algum erro, verificamos se foi na validação dos dados */
        if (err instanceof Yup.ValidationError) {
          /* Obtendo os erros de validação retornados */
          const errors = getValidationErrors(err);
          /* Definindo os erros no formRef */
          formRef.current?.setErrors(errors);
          return;
        }

        /* Caso não tenha sido, criamos um toast para informar ao usuário */
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description:
            'Ocorreu um erro ao fazer login, verifique as credenciais.',
        });
      }
    },
    [signIn, addToast, history],
  );

  return (
    <Container>
      <Content>
        {/* Criando o container animado com o conteúdo */}
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          {/* Definindo o formulário para entrada dos dados de login */}
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu logon</h1>

            {/* Campo para entrar com o e-mail */}
            <Input name="email" icon={FiMail} placeholder="E-mail" />

            {/* Campo para entrar com a senha */}
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Button type="submit">Entrar</Button>

            <Link to="/forgot-password">Esqueci minha senha</Link>
          </Form>

          {/* Link para a página de cadastro */}
          <Link to="/signup">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
};

export default SignIn;
