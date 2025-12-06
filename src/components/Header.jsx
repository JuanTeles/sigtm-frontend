import React, { useState } from 'react';
import { Shield, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';


const Header = () => {
  // Estado para controlar se o menu está aberto ou fechado
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Função para alternar o estado
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark shadow-sm" style={{ backgroundColor: '#3b82f6', padding: '1rem 2rem' }}>
      <div className="container-fluid max-w-7xl">

        {/* LOGO */}
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <Shield size={32} color="#facc15" fill="#facc15" />
          <span className="fw-bold fs-3 text-uppercase tracking-wide">IRECÊ</span>
        </Link>

        {/* BOTÃO TOGGLER (HAMBÚRGUER) */}
        {/* controla o clique manualmente com onClick */}
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
        >
          {/* Alterna entre ícone de Menu e X dependendo se está aberto */}
          {isMenuOpen ? <X size={30} color="white" /> : <Menu size={30} color="white" />}
        </button>

        {/* ITEMS DO MENU */}
        <div className={`collapse navbar-collapse justify-content-end ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav align-items-center gap-4 text-center pt-3 pt-lg-0">

            <li className="nav-item">
              {/* onClick={toggleMenu} para fechar o menu ao clicar em um link no mobile */}
              <Link className="nav-link text-white fw-bold" to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            </li>

        <li className="nav-item">
              <Link
                className="nav-link text-white fw-bold"
                to="/admin"
                onClick={() => setIsMenuOpen(false)}
              >
               Painel de administrador
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link text-white fw-bold"
                to="/fazer-reserva"
                onClick={() => setIsMenuOpen(false)}
              >
                Fazer reserva
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-white fw-bold"
                to="/SolicitarParceria"
                onClick={() => setIsMenuOpen(false)}
              >
               Virar parceiro
              </Link>
            </li>

      {/* isso deve aparecer apenas na tela do parceiro

<li className="nav-item">
              <a claassName="nav-link text-white fw-bold" href="#" onClick={() => setIsMenuOpen(false)}>Virar parceiro</a>
            </li>
*/}


            {/* Botão Entrar */}
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

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;