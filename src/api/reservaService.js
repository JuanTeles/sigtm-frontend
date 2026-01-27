// src/api/reservaService.js
import api from './axiosConfig';

// Endpoint base das reservas
const BASE_URL = '/reservas';

// Salvar uma nova reserva
export const salvarReserva = async (reservaDTO) => {
    try {
        const response = await api.post(`${BASE_URL}/save`, reservaDTO);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Listar todas as reservas (se precisar futuramente)
export const listarReservas = async () => {
    try {
        // Adicionamos o objeto de configuração como segundo parâmetro do get (ou terceiro do post)
        const response = await api.get(`${BASE_URL}/findall`, {
            withCredentials: true // <--- Força o envio do cookie nesta requisição
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Buscar itens para o Select (Reutilizando os endpoints existentes)
export const listarPontosParaReserva = async () => {
    const response = await api.get('/pontos-turisticos/findall');
    return response.data;
};

export const listarEventosParaReserva = async () => {
    const response = await api.get('/eventos/findall');
    return response.data;
};