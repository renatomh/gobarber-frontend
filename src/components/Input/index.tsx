import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
// Importando as propriedades básicas dos ícones
import { IconBaseProps } from 'react-icons';
// Importando o ícone para quando houver algum erro no preenchimento do input
import { FiAlertCircle } from 'react-icons/fi';
// importando o hook para os campos do formulário
import { useField } from '@unform/core';

// Importando os estilos personalizados criados para o componente
import { Container, Error } from './styles';

// Aqui estendemos as propriedades existentes no Input tradicional do HTML
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  // Tornamos o nome obrigatório
  name: string;
  // Passando o estilo para permiri personalização
  containerStyle?: React.CSSProperties;
  // Definindo o ícone do Input como sendo do tipo componente do React e opcional
  // E informando ainda o tipo do componente (IconBaseProps)
  icon?: React.ComponentType<IconBaseProps>;
}

// Criando o componente do input para reaproveitar em diversas páginas da aplicação
// Passamos a interface criada para o componente
// Convertemos o nome do ícone para 'Icon' para o React entender que é um componente
const Input: React.FC<InputProps> = ({
  name,
  containerStyle = {},
  icon: Icon,
  ...rest
}) => {
  // Criando a referência para o input com a tipagem do input do HTML
  const inputRef = useRef<HTMLInputElement>(null);
  // Definindo o estado para quando o campo estiver focado (clicado pelo usuário)
  const [isFocused, setIsFocused] = useState(false);
  // Definindo o estado para quando o campo estiver preenchido
  const [isFilled, setIsFilled] = useState(false);

  // Definindo o hook para o campo a partir do nome do input
  const { fieldName, defaultValue, error, registerField } = useField(name);

  // Função para lidar com o input recebendo foco
  // Utilizamos o useCallback() do React para evitar recarregar a função toda hora
  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  // Função para lidar com o input perdendo foco
  // Utilizamos o useCallback() do React para evitar recarregar a função toda hora
  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    // Verificando se o input está preenchido para alterar a cor do ícone
    setIsFilled(!!inputRef.current?.value);
  }, []);

  // Assim que o componente for exibido em tela
  useEffect(() => {
    // Registramos o campo
    registerField({
      name: fieldName,
      // Definindo a referência atual
      ref: inputRef.current,
      // Pegando o valor atual da referência
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    // Aqui definimos as propriedades do componente, como erro, foco e preenchimento
    <Container
      style={containerStyle}
      isErrored={!!error}
      isFocused={isFocused}
      isFilled={isFilled}
      // ID para utilização nos testes
      data-testid="input-container"
    >
      {/* Verificando se há um ícone e atribuindo o tamanho a ele */}
      {Icon && <Icon size={20} />}
      <input
        // Disponibilizando o nome do campo para outras funções
        name={name}
        // Definindo o que fazer quando o campo ganhar foco
        onFocus={handleInputFocus}
        // Definindo o que fazer quando o campo perder foco
        onBlur={handleInputBlur}
        // Estabelecendo o valor inicial
        defaultValue={defaultValue}
        // Associando o input à referência
        ref={inputRef}
        {...rest}
        // type="text"
      />
      {/* Caso exista algum erro, apresentamos o ícone no campo do input */}
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
