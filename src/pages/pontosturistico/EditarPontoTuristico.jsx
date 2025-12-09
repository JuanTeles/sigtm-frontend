import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getPontoTuristicoById, updatePontoTuristico } from '../../api/pontoTuristicoService';

// Importa o CSS compartilhado (mesmo usado na Listagem e Cadastro)
import '../../css/PontoTuristico.css';

const EditarPontoTuristico = () => {
  const { id } = useParams(); // Pega o ID da URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Começa true pois vai buscar dados

  // Estado inicial vazio
  const [formData, setFormData] = useState({
    nome: '',
    estado: '',
    cidade: '',
    descricao: '',
    bairro: '',
    rua: '',
    numero: '',
    horarioAbertura: '',
    horarioFechamento: '',
    nivelAcessibilidade: 1
  });

  // 1. Busca os dados ao carregar a página
  useEffect(() => {
    const carregarDados = async () => {
      try {
        const dados = await getPontoTuristicoById(id);
        
        // Preenche o state com o que veio do backend
        // Note que desmembramos 'endereco' para os campos planos do form
        setFormData({
          nome: dados.nome,
          descricao: dados.descricao,
          horarioAbertura: dados.horarioAbertura,
          horarioFechamento: dados.horarioFechamento,
          nivelAcessibilidade: dados.nivelAcessibilidade,
          // Endereço (verifica se existe para evitar erro null)
          estado: dados.endereco?.estado || dados.endereco?.uf || '', 
          cidade: dados.endereco?.cidade || '',
          bairro: dados.endereco?.bairro || '',
          rua: dados.endereco?.rua || '',
          numero: dados.endereco?.numero || ''
        });
      } catch (error) {
        console.error("Erro ao carregar ponto:", error);
        alert("Erro ao buscar dados do ponto turístico.");
        navigate('/pontos-turisticos');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      carregarDados();
    }
  }, [id, navigate]);

  // 2. Atualiza state ao digitar
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 3. Envia a atualização (PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Monta o payload igual ao Cadastro (recria o objeto endereço)
      const payload = {
        nome: formData.nome,
        descricao: formData.descricao,
        horarioAbertura: formData.horarioAbertura,
        horarioFechamento: formData.horarioFechamento,
        nivelAcessibilidade: parseInt(formData.nivelAcessibilidade),
        endereco: {
          rua: formData.rua,
          numero: formData.numero,
          bairro: formData.bairro,
          cidade: formData.cidade,
          estado: formData.estado // ou 'uf' dependendo do seu DTO Java
        }
      };

      await updatePontoTuristico(id, payload);

      alert('Ponto turístico atualizado com sucesso!');
      navigate('/pontos-turisticos');

    } catch (error) {
      console.error('Erro ao atualizar:', error);
      const errorMsg = error.response?.data?.message || 'Erro ao atualizar dados.';
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.nome) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-4">EDITAR PONTO TURÍSTICO:</h1>

      {/* REUTILIZANDO A CLASSE DO CSS: form-card-gray */}
      <div className="form-card-gray">
        <form onSubmit={handleSubmit}>
          
          {/* --- LINHA 1 --- */}
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label form-label-bold">NOME</label>
              <input 
                type="text" name="nome" value={formData.nome} onChange={handleChange}
                className="form-control form-control-clean" required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label form-label-bold">ESTADO (UF):</label>
              <input 
                type="text" name="estado" value={formData.estado} onChange={handleChange}
                className="form-control form-control-clean" maxLength="2" required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label form-label-bold">CIDADE:</label>
              <input 
                type="text" name="cidade" value={formData.cidade} onChange={handleChange}
                className="form-control form-control-clean" required
              />
            </div>
          </div>

          {/* --- BLOCO CENTRAL --- */}
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label form-label-bold">DESCRIÇÃO</label>
              <textarea 
                name="descricao" value={formData.descricao} onChange={handleChange}
                className="form-control form-control-clean" rows="5" style={{ resize: 'none' }} required
              ></textarea>
            </div>
            <div className="col-md-6 d-flex flex-column gap-3">
              <div>
                <label className="form-label form-label-bold">BAIRRO:</label>
                <input 
                  type="text" name="bairro" value={formData.bairro} onChange={handleChange}
                  className="form-control form-control-clean" required
                />
              </div>
              <div className="row g-3">
                <div className="col-8">
                  <label className="form-label form-label-bold">RUA:</label>
                  <input 
                    type="text" name="rua" value={formData.rua} onChange={handleChange}
                    className="form-control form-control-clean" required
                  />
                </div>
                <div className="col-4">
                  <label className="form-label form-label-bold">Nº:</label>
                  <input 
                    type="text" name="numero" value={formData.numero} onChange={handleChange}
                    className="form-control form-control-clean" required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* --- LINHA 3 --- */}
          <div className="row g-3 mb-5 align-items-end">
            <div className="col-md-3">
              <label className="form-label form-label-bold">HORÁRIO ABERTURA:</label>
              <input 
                type="time" name="horarioAbertura" value={formData.horarioAbertura} onChange={handleChange}
                className="form-control form-control-clean text-secondary" required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label form-label-bold">HORÁRIO FECHAMENTO:</label>
              <input 
                type="time" name="horarioFechamento" value={formData.horarioFechamento} onChange={handleChange}
                className="form-control form-control-clean text-secondary" required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label form-label-bold d-block mb-2">
                ACESSIBILIDADE ({formData.nivelAcessibilidade}):
              </label>
              <input 
                type="range" name="nivelAcessibilidade" value={formData.nivelAcessibilidade} onChange={handleChange}
                className="form-range" min="0" max="5" 
              />
            </div>
          </div>

          {/* --- BOTÕES (Classes btn-pill-blue do CSS) --- */}
          <div className="d-flex justify-content-center gap-3">
            <Link 
              to="/pontos-turisticos" 
              className="btn btn-pill-blue text-decoration-none d-flex align-items-center justify-content-center"
            >
              CANCELAR
            </Link>
            
            <button 
              type="submit" 
              disabled={loading} 
              className="btn btn-pill-blue"
            >
              {loading ? 'SALVANDO...' : 'SALVAR ALTERAÇÕES'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarPontoTuristico;