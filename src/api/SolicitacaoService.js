import api from './axiosConfig';

const ENDPOINT = '/solicitacoes';

export const getSolicitacoes = async () => {
    const response = await api.get(`${ENDPOINT}/findall`);
    return response.data; 
};

export const getSolicitacaoById = async (id) => {
    const response = await api.get(`${ENDPOINT}/find/${id}`);
    return response.data;
};

export const createSolicitacao = async (dadosSolicitacao) => {
    const response = await api.post(`${ENDPOINT}/save`, dadosSolicitacao);
    return response.data;
};

export const deleteSolicitacao = async (id) => {
    await api.delete(`${ENDPOINT}/delete/${id}`);
};

export const getSolicitacaoByUsuarioId = async (usuarioId) => {
    const response = await api.get(`${ENDPOINT}/find/usuario/${usuarioId}`);
    return response.data;
};


export const getSolicitacoesAtivas = async () => {
    const response = await api.get(`${ENDPOINT}/find/ativas`);
    return response.data;
};

// GET - Buscar por Nome do Usuário (Query Param)
// Chama: GET http://localhost:8080/solicitacoes/find/buscar?nome=X
export const buscarSolicitacaoPorNomeUsuario = async (nome) => {
    const response = await api.get(`${ENDPOINT}/find/buscar`, {
        params: { nome: nome }
    });
    return response.data;
};