import api from './axiosConfig';

const ENDPOINT = '/parceiros';

export const getParceiros = async () => {
    const response = await api.get(`${ENDPOINT}/findall`);
    return response.data; 
};

export const getParceiroById = async (id) => {
    const response = await api.get(`${ENDPOINT}/find/${id}`);
    return response.data;
};

export const saveParceiro = async (dadosParceiro) => {

    const response = await api.post(`${ENDPOINT}/save`, dadosParceiro);
    return response.data;
};

export const deleteParceiro = async (id) => {
    await api.delete(`${ENDPOINT}/delete/${id}`);
};


export const buscarParceiroPorNome = async (nome) => {
    const response = await api.get(`${ENDPOINT}/find/buscar`, {
        params: { nome: nome }
    });
    return response.data;
};

export const buscarParceiroPorCnpj = async (cnpj) => {
    const response = await api.get(`${ENDPOINT}/find/cnpj/${cnpj}`);
    return response.data;
};

export const promoverUsuarioParaParceiro = async (usuarioId) => {
    const response = await api.post(`${ENDPOINT}/promover/${usuarioId}`);
    return response.data;
};

export const rebaixarParceiroParaUsuario = async (parceiroId) => {
    const response = await api.post(`${ENDPOINT}/rebaixar/${parceiroId}`);
    return response.data;
};