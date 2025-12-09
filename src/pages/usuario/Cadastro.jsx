import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUsuario } from '../../api/authService';
import '../../css/global/StyleForms.css';

const Cadastro = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const ID_TIPO_USUARIO_COMUM = 2; 

  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem!");
      setLoading(false);
      return;
    }

    try {
      // --- CORREÇÃO DEFINITIVA (Payload Plano/Flat) ---
      // Baseado no seu DTO Java: UsuarioCadastroDTO
      // NÃO EXISTE 'usuarioComum' aqui. Enviamos nome e cpf na raiz.
      
      const payloadDTO = {
        email: formData.email,
        senha: formData.senha,
        tipoUsuarioId: ID_TIPO_USUARIO_COMUM,
        
        // Campos movidos para a raiz (para bater com o DTO Java)
        nome: formData.nome,
        cpf: formData.cpf,
        
        // AVISO: O campo 'telefone' NÃO existe no seu Java DTO atual.
        // Se você não adicionar "private String telefone;" no Java, 
        // esse dado será perdido ou ignorado. Estou enviando mesmo assim.
        telefone: formData.telefone 
      };

      console.log("Enviando JSON Correto:", payloadDTO);

      await createUsuario(payloadDTO);

      alert('Cadastro realizado com sucesso!');
      navigate('/login');

    } catch (error) {
      console.error('Erro de Cadastro:', error);
      
      // Tratamento para Erro 400 (Validação do Java)
      if (error.response && error.response.status === 400) {
        // Pode ser CPF inválido ou Senha curta
        alert("Erro de Validação: Verifique se o CPF é válido e a senha tem 6 dígitos.");
      } else {
        const msg = error.response?.data?.message || 'Erro ao realizar cadastro.';
        alert(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-4">CADASTRAR USUÁRIO:</h1>
      <div className="form-card-gray">
        <form onSubmit={handleSubmit}>
          
          {/* Linha 1 */}
          <div className="row g-3 mb-3">
            <div className="col-md-8">
              <label className="form-label form-label-bold">NOME COMPLETO</label>
              <input type="text" name="nome" className="form-control form-control-clean" placeholder="Ex: João da Silva" value={formData.nome} onChange={handleChange} required />
            </div>
            <div className="col-md-4">
              <label className="form-label form-label-bold">CPF</label>
              <input type="text" name="cpf" className="form-control form-control-clean" placeholder="000.000.000-00" maxLength="14" value={formData.cpf} onChange={handleChange} required />
            </div>
          </div>

          {/* Linha 2 */}
          <div className="row g-3 mb-3">
            <div className="col-md-4">
              <label className="form-label form-label-bold">TELEFONE</label>
              <input type="text" name="telefone" className="form-control form-control-clean" placeholder="(74) 99999-9999" value={formData.telefone} onChange={handleChange} required />
            </div>
            <div className="col-md-8">
              <label className="form-label form-label-bold">EMAIL (LOGIN)</label>
              <input type="email" name="email" className="form-control form-control-clean" placeholder="seu@email.com" value={formData.email} onChange={handleChange} required />
            </div>
          </div>

          {/* Linha 3 */}
          <div className="row g-3 mb-5">
            <div className="col-md-6">
              <label className="form-label form-label-bold">SENHA</label>
              <input type="password" name="senha" className="form-control form-control-clean" placeholder="Mínimo 6 caracteres" value={formData.senha} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label form-label-bold">CONFIRMAR SENHA</label>
              <input type="password" name="confirmarSenha" className="form-control form-control-clean" placeholder="Repita a senha" value={formData.confirmarSenha} onChange={handleChange} required />
            </div>
          </div>

          {/* Botões */}
          <div className="d-flex justify-content-center gap-3">
            <Link to="/login" className="btn btn-pill-blue text-decoration-none d-flex align-items-center justify-content-center">CANCELAR</Link>
            <button type="submit" disabled={loading} className="btn btn-pill-blue">
              {loading ? 'SALVANDO...' : 'CADASTRAR'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Cadastro;