import api from './axiosConfig';

/**
 * Envia o evento com o endereço aninhado para o Backend.
 * Endpoint esperado: POST /eventos/save (ou similar)
 */
export const createEvento = async (eventoDTO) => {
    try {
        // O backend espera o JSON com a estrutura aninhada.
        // O Axios converte o objeto JS para JSON automaticamente.
        const response = await api.post('/eventos/save', eventoDTO);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar evento:", error);
        throw error;
    }
};