import axios from 'axios';

// Criando a comunicação com a API
const api = axios.create({
  // Definindo a URL base
  baseURL: 'http://localhost:3333',
});

export default api;
