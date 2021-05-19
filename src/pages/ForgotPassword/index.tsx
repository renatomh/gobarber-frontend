import React, { useCallback, useRef, useState } from 'react';
/* Importando os ícones do Feather Icon */
import { FiLogIn, FiMail } from 'react-icons/fi';
/* Biblioteca da Rocketseat para trabalhar com formulários com melhor desempenho */
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
/* Biblioteca para validação de dados do formulário */
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

/* Importando os contextos dos toasts */
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
import api from '../../services/api';

/* Definindo a tipagem para o formulário com os dados */
interface ForgotPasswordFormData {
  email: string;
}

/* Criando o componente para solicitar recuperação de senha */
const ForgotPassword: React.FC = () => {
  /* Criando os estados para a página */
  const [loading, setLoading] = useState(false);
  /* Criando a referência para o formulário */
  const formRef = useRef<FormHandles>(null);

  /* Pegando os métodos dos contextos de toasts */
  const { addToast } = useToast();

  /* Função para lidar com o submit do formulário */
  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        /* Atualizando o estado da página para "carregando" */
        setLoading(true);

        /* Zerando os erros que possam advir de preenchimentos de inputs passados */
        formRef.current?.setErrors({});

        /* Definindo o schema de validação */
        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail obrigatório'),
        });

        /* Validando os dados de acordo com o schema criado */
        await schema.validate(data, {
          /* Aqui definimos que todos os erros encontrados serão retornados */
          abortEarly: false,
        });

        /* Fazendo a chamada à API para recuperação da senha */
        await api.post('/password/forgot', {
          email: data.email,
        });
        addToast({
          type: 'success',
          title: 'E-mail de recuperação enviado',
          description:
            'Enviamos um e-mail para confirmar a recuperação de senha, verifique sua caixa de entrada.',
        });
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
          title: 'Erro na recuperação de senha',
          description:
            'Ocorreu um erro ao tentar realizar a recuperação de senha, tente novamente.',
        });
      } finally {
        /* Ao final da execução do try/catch */
        /* Atualizando o estado da página para "carregado" */
        setLoading(false);
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Content>
        {/* Criando o container animado com o conteúdo */}
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          {/* Definindo o formulário para entrada dos dados de recuperação de senha */}
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar senha</h1>

            {/* Campo para entrar com o e-mail */}
            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Button loading={loading} type="submit">
              Recuperar
            </Button>
          </Form>

          {/* Link para a página de login */}
          <Link to="/">
            <FiLogIn />
            Voltar ao login
          </Link>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
};

export default ForgotPassword;
