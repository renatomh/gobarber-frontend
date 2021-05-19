import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { isToday, format, parseISO, isAfter } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import DayPicker, { DayModifiers } from 'react-day-picker';
// Importando os estilos padrão para o 'day picker'
import 'react-day-picker/lib/style.css';

import { FiClock, FiPower } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  Calendar,
  Section,
  Appointment,
  NextAppointment,
} from './styles';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface Appointment {
  id: string;
  date: string;
  hourFormatted: string;
  user: {
    name: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  // Importando a função para sair da aplicação e os dados do usuários autenticado
  const { signOut, user } = useAuth();

  // Estados para a data selecionada (inicializamos na data atual)
  const [selectedDate, setSelectedDate] = useState(new Date());
  // Utilizado para carregar os dados de dias disponíveis para o mês
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthAvailability, setMmonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);
  // Estado para os agendamentos
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Criando a função para lidar com a seleção de uma data
  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    // Verificando se se trata de um dia disponível e se não está desabilitado
    // Para evtar seleção dos dias que já passaram ou não estão habilitados
    if (modifiers.available && !modifiers.disabled) {
      // Atualizando a data selecionada
      setSelectedDate(day);
    }
  }, []);

  // Criando a função para lidar com a troca de mês no calendário
  const handleMonthChange = useCallback((month: Date) => {
    // Atualizando o mês selecionado
    setCurrentMonth(month);
  }, []);

  // Função a ser chamada sempre que o mês selecionado mudar
  useEffect(() => {
    // Fazendo a chamado à API para obter a disponibilidade no mês
    api
      .get(`/providers/${user.id}/month-availability`, {
        // Pasando os parâmetros para a chamada
        params: {
          year: currentMonth.getFullYear(),
          // Ele sempre retorna o mês começando o índice em 0
          month: currentMonth.getMonth() + 1,
        },
      })
      .then(response => {
        // Atualizando a disponibilidade do mês
        setMmonthAvailability(response.data);
      });
  }, [currentMonth, user.id]);

  // Função a ser chamada sempre que o dia selecionado mudar
  useEffect(() => {
    // Fazendo a chamado à API para obter os agendamentos
    // Informamos ainda o tipo de retorno esperado pela chamada
    api
      .get<Appointment[]>(`/appointments/me`, {
        // Pasando os parâmetros para a chamada
        params: {
          year: selectedDate.getFullYear(),
          // Ele sempre retorna o mês começando o índice em 0
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(response => {
        // Formatando ainda o horário do agendamento
        const appointmentsFormatted = response.data
          .map(appointment => {
            return {
              // Inserindo todos os dados do agendamento
              ...appointment,
              // Acrescentando o horário formatado
              hourFormatted: format(parseISO(appointment.date), 'HH:mm'),
            };
          })
          // Ordenando ainda por horário de atendimento
          .sort((a, b) => {
            return a.hourFormatted > b.hourFormatted ? 1 : -1;
          });
        // Atualizando os agendamentos
        setAppointments(appointmentsFormatted);
        // console.log(appointmentsFormatted);
      });
  }, [selectedDate]);

  // O 'useMemo' é um 'hook' do React para lidar com variáveis fora de outros hooks/funções
  // Criando a lista de dias desabilitados no mês/ano
  const dsiabledDays = useMemo(
    () => {
      // Filtrando apenas o dias que não estão disponíveis
      const dates = monthAvailability
        .filter(monthDay => monthDay.available === false)
        .map(monthDay => {
          // Aqui não somamos 1 ao mês, pois estamos pegando de um 'Date' e colocando em outro
          const month = currentMonth.getMonth();
          const year = currentMonth.getFullYear();
          // Criando e retornando o objeto de data para o ano, mês e dia
          return new Date(year, month, monthDay.day);
        });
      return dates;
    },
    // Definindo quais variáveis chamarão a função ao serem modificadas
    [currentMonth, monthAvailability],
  );

  // Variável para armazenar a data selecionada formatada
  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", { locale: ptBR });
  }, [selectedDate]);

  // Variável para armazenar o dia da semana da data selecionada
  const selectedWeekDay = useMemo(() => {
    return format(selectedDate, 'cccc', { locale: ptBR });
  }, [selectedDate]);

  // Agendamentos da manhã e tarde
  const morningAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      // Verificando se o horário agendado está antes de meio dia
      return parseISO(appointment.date).getHours() < 12;
    });
  }, [appointments]);
  const afternoonAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      // Verificando se o horário agendado está depois de meio dia ou é ao meio dia
      return parseISO(appointment.date).getHours() >= 12;
    });
  }, [appointments]);

  // Próximo agendamento
  const nextAppointment = useMemo(() => {
    return appointments.find(appointment =>
      // Verificando se o horário agendado está logo depois de agora
      isAfter(parseISO(appointment.date), new Date()),
    );
  }, [appointments]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          {/* Área de perfil do usuário */}
          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem-vindo,</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>

          {/* Botão para sair da plataforma */}
          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
      <Content>
        {/* Painel de agendamentos do usuário */}
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDay}</span>
          </p>

          {/* Informando o próximo agendamento, somente se tiver sido selecionado o dia de hoje
                        e se houver um próximo agendamento disponível */}
          {isToday(selectedDate) && nextAppointment && (
            <NextAppointment>
              <strong>Agendamento a seguir</strong>
              <div>
                {/* Ddaos do cliente */}
                <img
                  src={nextAppointment.user.avatar_url}
                  alt={nextAppointment.user.name}
                />
                <strong>{nextAppointment.user.name}</strong>
                {/* Horário agendado */}
                <span>
                  <FiClock />
                  {nextAppointment.hourFormatted}
                </span>
              </div>
            </NextAppointment>
          )}

          {/* Seções com os demais agendamentos */}
          <Section>
            <strong>Manhã</strong>

            {/* Caso não haja nenhum agendamento */}
            {morningAppointments.length === 0 && (
              <p>Nenhum agendamento neste período</p>
            )}

            {/* Listando os agendamentos da manhã */}
            {morningAppointments.map(appointment => (
              // Necessário passar a 'key' quando é feito um mapeamento
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hourFormatted}
                </span>
                <div>
                  <img
                    src={appointment.user.avatar_url}
                    alt={appointment.user.name}
                  />
                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>

          <Section>
            <strong>Tarde</strong>

            {/* Caso não haja nenhum agendamento */}
            {afternoonAppointments.length === 0 && (
              <p>Nenhum agendamento neste período</p>
            )}

            {/* Listando os agendamentos da tarde */}
            {afternoonAppointments.map(appointment => (
              // Necessário passar a 'key' quando é feito um mapeamento
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hourFormatted}
                </span>
                <div>
                  <img
                    src={appointment.user.avatar_url}
                    alt={appointment.user.name}
                  />
                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>
        </Schedule>
        {/* Calendário com as datas com agendamento */}
        <Calendar>
          {/* Documentação: https://react-day-picker.js.org/ */}
          <DayPicker
            // Apresentando os dias da semana no calendário em português
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            // Apresentando também os meses em português
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
            // Limitando a seleção para não permitir meses que já passaram
            fromMonth={new Date()}
            // Desabilitando os dias do fim de semana e os dias indisponíveis para o prestador de serviço
            disabledDays={[{ daysOfWeek: [0, 6] }, ...dsiabledDays]}
            // Adicionando os modificadores de classes
            modifiers={{
              // Classe para dias disponíveis
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            // Definindo a ação para quando o usuário clicar em um dia
            onDayClick={handleDateChange}
            // Definindo a ação para quando o usuário mudar o mês
            onMonthChange={handleMonthChange}
            // Destacando a data selecionada
            selectedDays={selectedDate}
          />
        </Calendar>
      </Content>
    </Container>
  );
};
export default Dashboard;
