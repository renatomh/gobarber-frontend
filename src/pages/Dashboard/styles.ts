import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

// Container principal para a tela
export const Container = styled.div``;

// Cabeçalho para a tela
export const Header = styled.header`
  padding: 32px 0;
  background: #28262E;
`;

// Conteúdo do cabeçalho
export const HeaderContent = styled.div`
  // Definindo a largura máxima para o conteúdo
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  // Estilizando a primeira imagem do cabeçalho (logo)
  > img {
    height: 80px;
  }

  button {
    // Ocupando todo o espaço na esquerda o possível com margem
    margin-left: auto;
    background: transparent;
    border: 0;

    // Todo ícone do React é um SVG
    svg {
      color: #999591;
      width: 20px;
      height: 20px;
    }
  }
`;

// Área de perfil para o usuário
export const Profile = styled.div`
  display: flex;
  align-items: center;
  // Distanciando um pouco da logo
  margin-left: 80px;

  // Estilizando a imagem de perfil (avatar)
  img {
    width: 56px;
    height: 56px;
    // Arredondando a imagem
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #F4EEE8;
    }

    // Nome do usuário com link para página de perfil
    a {
      text-decoration: none;
      color: #FF9000;

      // Reduzindo a opacidade ao passar o mouse sobre o texto
      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

// Conteúdo geral da página
export const Content = styled.main`
  // Definindo a largura máxima para o conteúdo da página
  max-width: 1120px;
  margin: 64px auto;
  // Permitindo que o agendamento e calendário fiquem um do lado do outro
  display: flex;
`;

// Agendamentos do usuário
export const Schedule = styled.div`
  // Ocupando metado do espaço do conteúdo da página
  flex: 1;
  margin-right: 120px;

  h1 {
    font-size: 36px;
  }

  p {
    margin-top: 8px;
    color: #FF9000;
    display: flex;
    align-items: center;
    font-weight: 500;

    // Aplicando o separador vertical a partir do segundo item
    span {
      display: flex;
      align-items: center;
    }
    span + span::before {
      content: '';
      width: 1px;
      height: 12px;
      background: #FF9000;
      // Adicionando a margem horizontal direita e esquerda
      margin: 0 8px;
    }

    // Poderíamos fazer também como abaixo
    /* span + span {
      margin-left: 8px;
      padding-left: 8px;
      border-left: 1px solid #FF9000;
    } */
  }
`;

// Infrmação sobre o próximo agendamento
export const NextAppointment = styled.aside`
  margin-top: 64px;

  strong {
    color: #999591;
    font-size: 20px;
    font-weight: 400;
  }

  div {
    background: #3E3B47;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-top: 24px;
    // Necessário para adicionar a pequena borda lateral esquerda
    position: relative;

    // Inserindo a pequena borda na lateral esquerda
    &::before {
      position: absolute;
      height: 80%;
      width: 1px;
      left: 0;
      top: 10%;
      content: '';
      background: #FF9000;
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: #FFF;
    }

    span {
      margin-left: auto;
      display: flex;
      align-items: center;
      color: #999591;

      // Ícone do agendamento
      svg {
        color: #FF9000;
        margin-right: 8px;
      }
    }
  }
  
`;

// Seção para os agendamentos
export const Section = styled.section`
  margin-top: 48px;

  // Para o primeiro item
  > strong {
    color: #999091;
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid #3E3B47;
    // Ocupando toda a área
    display: block;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }

  > p {
    color: #999591;
  }
`;

// Agendamentos do prestador de serviço
export const Appointment = styled.div`
  display: flex;
  align-items: center;

  // Toda a 'div' antes da qual houver um 'Appointment'
  & + div {
    margin-top: 16px;
  }

  span {
    margin-left: auto;
    display: flex;
    align-items: center;
    color: #F4EDE8;
    width: 70px;

    // Ícone do agendamento
    svg {
      color: #FF9000;
      margin-right: 8px;
    }
  }

  div {
    // Ocupando toda a extensão
    flex: 1;
    background: #3E3B47;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-left: 24px;
  }

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  strong {
    margin-left: 24px;
    color: #FFF;
    font-size: 20px;
  }
`;

// Calendário com agendamentos do prestador de serviço
export const Calendar = styled.aside`
  width: 380px;

  .DayPicker {
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
    background: #3e3b47;
    border-radius: 10px;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-NavButton {
    color: #999591 !important;
  }

  .DayPicker-NavButton--prev {
    right: auto;
    left: 1.5em;
    margin-right: 0;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px 0 0 0;
    padding: 16px;
    background-color: #28262e;
    border-radius: 0 0 10px 10px;
  }

  .DayPicker-Caption {
    margin-bottom: 1em;
    padding: 0 1em;
    color: #f4ede8;

    > div {
      text-align: center;
    }
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 10px;
    color: #fff;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #ff9000 !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;
