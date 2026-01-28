import api from './axiosConfig';

// Define a rota base para facilitar a manutenção
const ENDPOINT = '/eventos';

/**
 * Envia o evento com o endereço aninhado para o Backend.
 * Endpoint esperado: POST /eventos/save
 */
export const createEvento = async (eventoDTO) => {
    try {
        const response = await api.post(`${ENDPOINT}/save`, eventoDTO);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar evento:", error);
        throw error;
    }
};

// GET - Listar todos os eventos
// Endpoint: GET /eventos/findall
export const getEventos = async () => {
    const response = await api.get(`${ENDPOINT}/findall`);
    return response.data;
};

// GET - Buscar evento por ID
// Endpoint: GET /eventos/find/{id}
export const getEventoById = async (id) => {
    const response = await api.get(`${ENDPOINT}/find/${id}`);
    return response.data;
};

// PUT - Atualizar evento
// Endpoint: PUT /eventos/update/{id}
export const updateEvento = async (id, eventoDTO) => {
    const response = await api.put(`${ENDPOINT}/update/${id}`, eventoDTO);
    return response.data;
};

// DELETE - Remover evento
// Endpoint: DELETE /eventos/delete/{id}
export const deleteEvento = async (id) => {
    await api.delete(`${ENDPOINT}/delete/${id}`);
};

// GET - Buscar por nome (opcional, baseado no controller)
// Endpoint: GET /eventos/find/buscar?nome=X
export const buscarEventoPorNome = async (nome) => {
    const response = await api.get(`${ENDPOINT}/find/buscar`, {
        params: { nome }
    });
    return response.data;
};

export const getEventosFuturos = async () => {
    const response = await api.get('/eventos/futuros');
    return response.data;
};