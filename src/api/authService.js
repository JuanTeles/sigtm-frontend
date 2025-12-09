// src/api/authService.js
import api from './axiosConfig';

/**
 * Envia as credenciais para obter o token JWT.
 * Endpoint no Backend: POST /sessao (AuthController)
 * @param {string} login (email ou cpf)
 * @param {string} senha
 */
export const loginRequest = async (login, senha) => {
    try {
        const response = await api.post('/sessao', { 
            login, 
            senha 
        });
        return response.data; // Retorna o SessaoResponseDTO (token + dados user)
    } catch (error) {
        throw error;
    }
};

export const logoutRequest = () => {
    // Se o backend tiver um endpoint de logout (blacklist de token), chame aqui.
    // Caso contrário, apenas limpamos o local no frontend (feito no Context).
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};