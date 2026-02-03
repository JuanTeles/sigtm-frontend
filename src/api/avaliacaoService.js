import api from './axiosConfig';

// ===============================
// 1. Listar TODAS avaliações de um Ponto (Público) - [NOVO]
// ===============================
export const getAvaliacoesPorPonto = async (pontoId) => {
    if (!pontoId) return [];

    try {
        const response = await api.get(`/pontos-turisticos/${pontoId}/avaliacoes`);
        return response.data; // Retorna a lista de AvaliacaoResponseDTO
    } catch (error) {
        console.error("Erro ao buscar avaliações do ponto:", error.response?.data || error.message);
        // Retorna array vazio em caso de erro para não quebrar a tela de listagem
        return []; 
    }
};

// ===============================
// 2. Avaliações do usuário logado (Minhas Avaliações)
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
// 3. Criar avaliação (Ponto ou Evento)
// ===============================
export const saveAvaliacao = async (itemId, data, tipo) => {
    if (!itemId || !tipo) {
        throw new Error("Parâmetros inválidos para salvar avaliação");
    }

    // Define a rota com base na aba ativa ou tipo passado ("pontos" ou "eventos")
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
        // Log melhorado para capturar a mensagem exata do Spring Boot
        const mensagemErro = error.response?.data?.message || error.response?.data || error.message;
        console.error(`Erro ao salvar avaliação (${tipo}):`, mensagemErro);
        
        // Relança o erro com a mensagem tratada para o componente exibir no alert
        throw new Error(typeof mensagemErro === 'string' ? mensagemErro : "Erro ao conectar com o servidor.");
    }
};

// ===============================
// 4. Atualizar avaliação existente
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


export const getAvaliacoesPorEvento = async (eventoId) => {
    if (!eventoId) return [];

    try {
        const response = await api.get(`/eventos/${eventoId}/avaliacoes`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar avaliações do evento:", error.response?.data || error.message);
        return [];
    }
};