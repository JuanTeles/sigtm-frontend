import React, { useState } from 'react';
import { Shield, Menu, X, LogOut, User } from 'lucide-react'; // Adicionei LogOut e User
import { Link } from 'react-router-dom';
import { useAuth } from "../contexts/authContext"; // Importando o contexto

const Header = () => {
  const { signed, user, signOut } = useAuth(); // Pegando os dados do contexto
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark shadow-sm" style={{ backgroundColor: '#3b82f6', padding: '1rem 2rem' }}>
      <div className="container-fluid max-w-7xl">

        {/* LOGO */}
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <Shield size={32} color="#facc15" fill="#facc15" />
          <span className="fw-bold fs-3 text-uppercase tracking-wide text-white">IRECÊ</span>
        </Link>

        {/* BOTÃO HAMBÚRGUER */}
        <button className="navbar-toggler border-0" type="button" onClick={toggleMenu}>
          {isMenuOpen ? <X size={30} color="white" /> : <Menu size={30} color="white" />}
        </button>

        <div className={`collapse navbar-collapse justify-content-end ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav align-items-center gap-4 text-center pt-3 pt-lg-0">

            <li className="nav-item">
              <Link className="nav-link text-white fw-bold" to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            </li>

            {/* MOSTRAR APENAS SE FOR ADMIN */}
            {signed && user?.tipoUsuario?.nome === 'ADMIN' && (
              <li className="nav-item">
                <Link className="nav-link text-white fw-bold" to="/admin" onClick={() => setIsMenuOpen(false)}>Painel Admin</Link>
              </li>
            )}

            {/* MOSTRAR APENAS SE ESTIVER LOGADO */}
            {signed && (
              <li className="nav-item">
                <Link className="nav-link text-white fw-bold" to="/reservas" onClick={() => setIsMenuOpen(false)}>Fazer reserva</Link>
              </li>
            )}

            {/* VIRAR PARCEIRO: Só aparece se for usuário comum logado */}
            {signed && user?.tipoUsuario?.nome === 'COMUM' && (
              <li className="nav-item">
                <Link className="nav-link text-white fw-bold" to="/solicitar-parceria" onClick={() => setIsMenuOpen(false)}>Virar parceiro</Link>
              </li>
            )}

            {/* --- ÁREA DINÂMICA (LOGIN OU PERFIL) --- */}
            {!signed ? (
              // Se NÃO estiver logado: Mostra botão ENTRAR
              <li className="nav-item pb-3 pb-lg-0">
                <Link
                  to="/login"
                  className="btn fw-bold px-4 text-decoration-none"
                  style={{ backgroundColor: '#facc15', color: '#3b82f6' }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Entrar
                </Link>
              </li>
            ) : (
              // Se ESTIVER logado: Mostra nome do usuário e botão SAIR
              <li className="nav-item d-flex align-items-center gap-3 bg-white bg-opacity-10 p-2 rounded-pill px-3">
                <div className="d-flex align-items-center gap-2 text-white">
                  <User size={20} className="text-warning" />
                  <span className="fw-bold small">Olá, {user?.nome?.split(' ')[0]}</span>
                </div>
                
                <button 
                  onClick={handleLogout}
                  className="btn btn-sm btn-outline-light border-0 d-flex align-items-center gap-1 fw-bold"
                  title="Sair do sistema"
                >
                  <LogOut size={18} />
                  <span className="d-lg-none">Sair</span>
                </button>
              </li>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;