import api from './axiosConfig';

// ===============================
// Avaliações do usuário logado
// ===============================
export const getMinhasAvaliacoes = async () => {
    try {
        const response = await api.get('/avaliacoes/find/me');
        return response.data; // List<AvaliacaoResponseDTO>
    } catch (error) {
        console.error("Erro ao buscar minhas avaliações", error);
        throw error;
    }
};

// ===============================
// Criar avaliação (Ponto ou Evento)
// ===============================
export const saveAvaliacao = async (itemId, data, tipo) => {
    if (!itemId || !tipo) {
        throw new Error("Parâmetros inválidos para salvar avaliação");
    }

    const rota =
        tipo === 'pontos'
            ? `/pontos-turisticos/${itemId}/avaliacoes/save`
            : `/eventos/${itemId}/avaliacoes/save`;

    try {
        const response = await api.post(rota, {
            estrelas: data.estrelas,
            descricao: data.descricao
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao salvar avaliação", error);
        throw error;
    }
};

// ===============================
// Atualizar avaliação existente
// ===============================
export const updateAvaliacao = async (id, data) => {
    if (!id) {
        throw new Error("ID da avaliação é obrigatório");
    }

    try {
        const response = await api.put(`/avaliacoes/update/${id}`, {
            estrelas: data.estrelas,
            descricao: data.descricao
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar avaliação", error);
        throw error;
    }
};
