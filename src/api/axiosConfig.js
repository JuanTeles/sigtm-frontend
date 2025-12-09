// src/api/axiosConfig.js
import axios from 'axios';

// Cria uma instância do Axios
const api = axios.create({
    // URL do seu Backend Spring Boot.
    // Se o seu backend estiver noutra porta, altere aqui (ex: 8080).
    baseURL: 'http://localhost:8080', 
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor de Requisição: Antes de enviar o pedido, verifica se tem token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            // Adiciona o cabeçalho Authorization: Bearer <token>
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;