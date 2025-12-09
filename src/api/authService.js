// src/api/authService.js
import api from './axiosConfig';

/**
 * Endpoint no Backend: POST /auth/login (AuthController)
 * DTO Java: LoginDTO { email, senha }
 */
export const loginRequest = async (login, senha) => {
    try {
        // O backend espera 'email', não 'login'
        const response = await api.post('/auth/login', { 
            email: login, 
            senha 
        });
        return response.data; // Retorna SessaoResponseDTO direto
    } catch (error) {
        throw error;
    }
};

export const createUsuarioComum = async (dadosPessoa) => {
    // Backend: UsuarioComumController -> /usuarios-comuns/save
    const response = await api.post('/usuarios-comuns/save', dadosPessoa);
    return response.data; 
};

export const createUsuario = async (dadosUsuario) => {
    // Backend: UsuarioController -> /usuarios/save
    const response = await api.post('/usuarios/save', dadosUsuario);
    return response.data;
};

export const logoutRequest = async () => {
    // É boa prática chamar o logout no back para invalidar a sessão
    try {
        await api.post('/auth/logout');
    } catch (e) {
        console.error("Erro ao fazer logout no servidor", e);
    }
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};