import api from './axiosConfig';

// ===============================
// Avaliações do usuário logado
// ===============================
export const getMinhasAvaliacoes = async () => {
    try {
        const response = await api.get('/avaliacoes/find/me');
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar minhas avaliações:", error.response?.data || error.message);
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

    // Define a rota com base na aba ativa ("pontos" ou "eventos")
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
        // Log melhorado para mostrar a mensagem do Backend
        const mensagemErro = error.response?.data?.message || error.response?.data || error.message;
        console.error(`Erro ao salvar avaliação (${tipo}):`, mensagemErro);
        
        // Relança o erro com a mensagem tratada para o componente exibir no alert
        throw new Error(typeof mensagemErro === 'string' ? mensagemErro : "Erro ao conectar com o servidor.");
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
        console.error("Erro ao atualizar avaliação:", error.response?.data || error.message);
        throw error;
    }
};