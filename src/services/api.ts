import axios from 'axios';

// Criando a comunicação com a API
const api = axios.create({
  // Definindo a URL base
  baseURL: process.env.REACT_APP_API_URL,
});

export default api;
