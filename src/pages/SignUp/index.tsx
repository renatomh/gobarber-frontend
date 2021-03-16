import React, { useCallback, useRef } from 'react';
// importando os ícones para os intpus e links
import { FiArrowLeft, FiUser, FiMail, FiLock } from 'react-icons/fi';
// Biblioteca com funções para lidar com os formulários
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
// Biblioteca para validação de dados do formulário
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

// Importando a comunicação com a API
import api from '../../services/api';

// Importando o contexto de toasts para apresentar mensagens para os usuários
import { useToast } from '../../hooks/toast';

// Função para obter a lista de mensagens de erros
import getValidationErrors from '../../utils/getValidationErrors';

// Importando a logo
import logoImg from '../../assets/logo.svg';

// Importando os componentes criados
import Input from '../../components/Input';
import Button from '../../components/Button';

// Importando os estilos personalizados
import { Container, Content, AnimationContainer, Background } from './styles';

// Criando a interface para o formulário de cadastro
interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

// Criadno a página de cadastro
const SignUp: React.FC = () => {
  // Criando a referência para o formulário
  const formRef = useRef<FormHandles>(null);
  // importando a função para adicionar toasts
  const { addToast } = useToast();
  // Pegando o histórico 
  const history = useHistory();

  // Função para lidar com a validação dos dados do formulário
  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        // Zerando os erros que possam advir de preenchimentos de inputs passados
        formRef.current?.setErrors({});

        // Definindo o schema de validação
        const schema = Yup.object().shape({
          // Definindo o tipo como string e definindo que é obrigatório
          name: Yup.string().required('Nome obrigatório'),
          // Definindo o tipo como string de e-mail e definindo que é obrigatório
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail obrigatório'),
          // Definindo o tipo como string e o tamanho mínimo como 6 dígitos (logo, é obrigatório)
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
        });

        // Validando os dados de acordo com o schema criado
        await schema.validate(data, {
          // Aqui definimos que todos os erros encontrados serão retornados
          abortEarly: false,
        });

        // Fazendo a chamada à API para o cadastro dos usuários
        await api.post('/users', data);
        // Voltando para a tela inicial
        history.push('/');

        // Caso seja bem sucedido, apresentamos o toast
        addToast({
          // Definindo o tipo do toast, o título e a descrição
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu logon no GoBarber!',
        });
      } catch (err) {
        // Caso ocorra algum erro, verificamos se foi na validação dos dados
        if (err instanceof Yup.ValidationError) {
          // Obtendo os erros de validação retornados
          const errors = getValidationErrors(err);
          // Definindo os erros no formRef
          formRef.current?.setErrors(errors);
          return;
        }

        // Caso não tenha sido, criamos um toast informando o usuário
        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      {/* Aqui a imagem de fundo ficará antes do formulário (à esquerda) */}
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          {/* Criando o formulário de cadastro, definindo o formRef e a função para lidar com o submit */}
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>

            <Input name="name" icon={FiUser} placeholder="Nome" />

            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Button type="submit">Cadastrar</Button>
          </Form>

          {/* Link para retornar para a página de login */}
          <Link to="/">
            <FiArrowLeft />
            Voltar para logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
