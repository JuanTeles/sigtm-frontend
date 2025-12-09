// src/api/authService.js
import api from './axiosConfig';

/**
 * Endpoint de Login
 * Backend: POST /auth/login
 */
export const loginRequest = async (login, senha) => {
    try {
        const response = await api.post('/auth/login', { 
            email: login, 
            senha 
        });
        return response.data; 
    } catch (error) {
        throw error;
    }
};

/**
 * --- MUDANÇA AQUI ---
 * Antes: Recebia apenas dados de login (email/senha)
 * Agora: Recebe o objeto UNIFICADO (login + dados pessoais aninhados)
 * * O JSON enviado será algo como:
 * {
 * "email": "...",
 * "senha": "...",
 * "tipoUsuarioId": 2,
 * "usuarioComum": { "nome": "...", "cpf": "..." }
 * }
 */
export const createUsuario = async (dadosUnificados) => {
    // Backend: UsuarioController -> /usuarios/save
    // O axios converte 'dadosUnificados' para JSON automaticamente
    const response = await api.post('/usuarios/save', dadosUnificados);
    return response.data;
};

// A função 'createUsuarioComum' foi REMOVIDA pois não deve ser usada isoladamente.

export const logoutRequest = async () => {
    try {
        await api.post('/auth/logout');
    } catch (e) {
        console.error("Erro ao fazer logout no servidor", e);
    }
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
};