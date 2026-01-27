import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/authContext';

const CadastroPromocao = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // 🔹 STATES (sempre no topo)
  const [tiposPromocao, setTiposPromocao] = useState([]);
  const [loadingTipos, setLoadingTipos] = useState(true);

  const [form, setForm] = useState({
    titulo: '',
    descricao: '',
    regras: '',
    dataInicio: '',
    dataTermino: '',
    tipoPromocaoId: ''
  });

  const podeGerenciar =
    user?.tipoUsuario?.toLowerCase() === 'gestor' ||
    user?.tipoUsuario?.toLowerCase() === 'parceiro';

  // 🔹 Buscar tipos de promoção
  useEffect(() => {
    axios
      .get('http://localhost:8080/tipos-promocao/findall')
      .then(res => setTiposPromocao(res.data))
      .catch(() => alert('Erro ao carregar tipos de promoção'))
      .finally(() => setLoadingTipos(false));
  }, []);

  // 🔹 Proteção de acesso (APÓS hooks)
  if (!podeGerenciar) {
    return (
      <div className="container py-5 text-center">
        <h4 className="text-danger fw-bold">Acesso restrito</h4>
        <p>Apenas gestores ou parceiros podem cadastrar promoções.</p>
      </div>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/promocoes/save', form);
      alert('Promoção cadastrada com sucesso!');
      navigate('/promocoes');
    } catch (error) {
      alert('Erro ao cadastrar promoção.');
    }
  };

  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-4">CADASTRAR PROMOÇÃO</h1>

      <div className="p-4 p-md-5 rounded shadow-sm" style={{ backgroundColor: '#e5e7eb' }}>
        <form onSubmit={handleSubmit}>

          {/* LINHA 1 */}
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label fw-bold text-secondary small">TÍTULO:</label>
              <input
                type="text"
                name="titulo"
                className="form-control p-3 border-0"
                value={form.titulo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold text-secondary small">
                TIPO DE PROMOÇÃO:
              </label>

              {/* ✅ SELECT CORRETO */}
              <select
                name="tipoPromocaoId"
                className="form-select p-3 border-0"
                value={form.tipoPromocaoId}
                onChange={handleChange}
                required
                disabled={loadingTipos}
              >
                <option value="">Selecione um tipo</option>
                {tiposPromocao.map(tipo => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.titulo}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* LINHA 2 */}
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label fw-bold text-secondary small">DESCRIÇÃO</label>
              <textarea
                name="descricao"
                className="form-control border-0 p-3"
                rows="5"
                style={{ resize: 'none' }}
                value={form.descricao}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold text-secondary small">REGRAS:</label>
              <textarea
                name="regras"
                className="form-control border-0 p-3"
                rows="5"
                style={{ resize: 'none' }}
                value={form.regras}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* LINHA 3 */}
          <div className="row g-3 mb-5">
            <div className="col-md-3">
              <label className="form-label fw-bold text-secondary small">
                DATA DE INÍCIO:
              </label>
              <input
                type="date"
                name="dataInicio"
                className="form-control p-3 border-0"
                value={form.dataInicio}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-3">
              <label className="form-label fw-bold text-secondary small">
                DATA DE TÉRMINO:
              </label>
              <input
                type="date"
                name="dataTermino"          // ✅ CORRETO
                className="form-control p-3 border-0"
                value={form.dataTermino}    // ✅ CORRETO
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* BOTÕES */}
          <div className="d-flex justify-content-center gap-3">
            <Link
              to="/promocoes"
              className="btn btn-primary rounded-pill px-5 py-2 fw-bold border-0"
            >
              CANCELAR
            </Link>

            <button
              type="submit"
              className="btn btn-primary rounded-pill px-5 py-2 fw-bold border-0"
            >
              CADASTRAR
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CadastroPromocao;