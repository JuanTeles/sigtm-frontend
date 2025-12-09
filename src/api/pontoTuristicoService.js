import api from './axiosConfig';

// AJUSTE: Rota base com hífen para coincidir com o @RequestMapping do Java
const ENDPOINT = '/pontos-turisticos';

// GET - Listar todos
// Chama: GET http://localhost:8080/pontos-turisticos/findall
export const getPontosTuristicos = async () => {
    const response = await api.get(`${ENDPOINT}/findall`);
    return response.data; // Retorna Array de PontoTuristicoResponseDTO
};

// GET - Buscar por ID
// Chama: GET http://localhost:8080/pontos-turisticos/find/{id}
export const getPontoTuristicoById = async (id) => {
    const response = await api.get(`${ENDPOINT}/find/${id}`);
    return response.data;
};

// POST - Criar novo
// Chama: POST http://localhost:8080/pontos-turisticos/save
export const createPontoTuristico = async (dadosPonto) => {
    const response = await api.post(`${ENDPOINT}/save`, dadosPonto);
    return response.data;
};

// PUT - Atualizar existente
// Chama: PUT http://localhost:8080/pontos-turisticos/update/{id}
export const updatePontoTuristico = async (id, dadosPonto) => {
    const response = await api.put(`${ENDPOINT}/update/${id}`, dadosPonto);
    return response.data;
};

// DELETE - Remover
// Chama: DELETE http://localhost:8080/pontos-turisticos/delete/{id}
export const deletePontoTuristico = async (id) => {
    await api.delete(`${ENDPOINT}/delete/${id}`);
};

// GET - Buscar por Nome (Adicional, baseado no seu controller)
// Chama: GET http://localhost:8080/pontos-turisticos/find/buscar?nome=X
export const buscarPontoPorNome = async (nome) => {
    const response = await api.get(`${ENDPOINT}/find/buscar`, {
        params: { nome: nome }
    });
    return response.data;
};