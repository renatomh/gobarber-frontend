import React, { ChangeEvent, useCallback, useRef } from 'react';
/* importando os ícones para os intpus e links */
import { FiUser, FiMail, FiLock, FiCamera, FiArrowLeft } from 'react-icons/fi';
/* Biblioteca com funções para lidar com os formulários */
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
/* Biblioteca para validação de dados do formulário */
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

/* Importando a comunicação com a API */
import api from '../../services/api';

/* Importando o contexto de toasts para apresentar mensagens para os usuários */
import { useToast } from '../../hooks/toast';

/* Função para obter a lista de mensagens de erros */
import getValidationErrors from '../../utils/getValidationErrors';

/* Importando os componentes criados */
import Input from '../../components/Input';
import Button from '../../components/Button';

/* Importando os estilos personalizados */
import { Container, Content, AvatarInput } from './styles';
import { useAuth } from '../../hooks/auth';

/* Criando a interface para o formulário de perfil */
interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

/* Criando a página de perfil */
const Profile: React.FC = () => {
  /* Criando a referência para o formulário */
  const formRef = useRef<FormHandles>(null);
  /* importando a função para adicionar toasts */
  const { addToast } = useToast();
  /* Pegando o histórico */
  const history = useHistory();

  /* Pegando os dados do usuário logado */
  const { user, updateUser } = useAuth();

  /* Função para lidar com a validação dos dados do formulário */
  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        /* Zerando os erros que possam advir de preenchimentos de inputs passados */
        formRef.current?.setErrors({});

        /* Definindo o schema de validação */
        const schema = Yup.object().shape({
          /* Definindo o tipo como string e definindo que é obrigatório */
          name: Yup.string().required('Nome obrigatório'),
          /* Definindo o tipo como string de e-mail e definindo que é obrigatório */
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail obrigatório'),
          /* Definindo o tipo como string */
          old_password: Yup.string(),
          /* Só precisará informar uma nova senha caso a atual tenha sido informada */
          password: Yup.string().when('old_password', {
            is: val => !!val.length,
            /* O tamanho mínimo será 6 dígitos (logo, é obrigatório) */
            then: Yup.string().min(6, 'No mínimo 6 dígitos'),
            otherwise: Yup.string(),
          }),
          /* A confirmação de senha deve ser igual à nova senha definida */
          password_confirmation: Yup.string()
            .when('old_password', {
              is: val => !!val.length,
              /* O tamanho mínimo será 6 dígitos (logo, é obrigatório) */
              then: Yup.string().min(6, 'No mínimo 6 dígitos'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password')], 'As senhas não coincidem'),
        });

        /* Validando os dados de acordo com o schema criado */
        await schema.validate(data, {
          /* Aqui definimos que todos os erros encontrados serão retornados */
          abortEarly: false,
        });

        /* Pegando somente os dados do formulário que foram preenchidos */
        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;
        const formData = {
          name,
          email,
          /* Caso tenha sido passada a senha atual */
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        /* Fazendo a chamada à API para a atualização do perfil do usuário */
        const response = await api.put('/profile', formData);
        /* Atualizando o perfil no provider de autenticação */
        updateUser(response.data);
        /* Voltando para a tela inicial */
        history.push('/');

        /* Caso seja bem sucedido, apresentamos o toast */
        addToast({
          /* Definindo o tipo do toast, o título e a descrição */
          type: 'success',
          title: 'Perfil atualizado!',
          description:
            'As suas informações de perfil foram atualizadas com sucesso!',
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

        /* Caso não tenha sido, criamos um toast informando o usuário */
        addToast({
          type: 'error',
          title: 'Erro na atualização',
          description:
            'Ocorreu um erro ao atualizar o perfil, tente novamente.',
        });
      }
    },
    [addToast, history, updateUser],
  );

  /* Função para lidar com a atualização de perfil */
  const handleAvatarChange = useCallback(
    /* Pegando as informações do elemento em que ocorreu a mudança */
    (e: ChangeEvent<HTMLInputElement>) => {
      /* Caso algum arquivo tenha sido selecionado */
      if (e.target.files) {
        /* console.log(e.target.files[0]); */
        /* Criando o FormData para enviar o arquivo ao servidor */
        const data = new FormData();
        /* Inserindo os dados no ofrmulário */
        data.append('avatar', e.target.files[0]);
        /* Fazendo a chamada à API */
        api
          .patch('/users/avatar', data)
          /* Ao final da requisição */
          .then(response => {
            /* Atualizando o usuário no contexto de autenticação */
            updateUser(response.data);
            /* Informando o usuário sobre o sucesso na atualização */
            addToast({
              type: 'success',
              title: 'Avatar atualizado!',
            });
          });
      }
    },
    [addToast, updateUser],
  );

  return (
    <Container>
      {/* Cabeçalho da página */}
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>

      <Content>
        {/* Criando o formulário de cadastro, definindo o formRef e a função para lidar com o submit */}
        <Form
          ref={formRef}
          /* Inicializando os dados nos campos de input */
          initialData={{
            name: user.name,
            email: user.email,
          }}
          onSubmit={handleSubmit}
        >
          {/* Imamge de perfil (avatar) do usuário */}
          <AvatarInput>
            <img src={user.avatar_url} alt={user.name} />
            <label htmlFor="avatar">
              <FiCamera />
              {/* Criando o input para o arquivo de imagem para o avatar */}
              <input
                type="file"
                id="avatar"
                /* Definindo a função a ser chamada quando for escolhido um arquivo */
                onChange={handleAvatarChange}
              />
            </label>
          </AvatarInput>

          <h1>Meu perfil</h1>

          <Input name="name" icon={FiUser} placeholder="Nome" />

          <Input name="email" icon={FiMail} placeholder="E-mail" />

          <Input
            /* Espaçando o input de "Senha atual" */
            containerStyle={{ marginTop: 24 }}
            name="old_password"
            icon={FiLock}
            type="password"
            placeholder="Senha atual"
          />

          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Nova senha"
          />

          <Input
            name="password_confirmation"
            icon={FiLock}
            type="password"
            placeholder="Confirmar senha"
          />

          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
