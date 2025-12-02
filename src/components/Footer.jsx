import React from 'react';
import { Facebook, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-5 pb-3 mt-auto">
      <div className="container">
        <div className="row">
          {/* Coluna Suporte */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold mb-3">Suporte</h5>
            <ul className="list-unstyled text-secondary">
              <li className="mb-2"><a href="#" className="text-decoration-none text-secondary hover-white">Ajuda</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-secondary hover-white">Informações de segurança</a></li>
            </ul>
          </div>

          {/* Coluna Empresa */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold mb-3">Empresa</h5>
            <ul className="list-unstyled text-secondary">
              <li className="mb-2"><a href="#" className="text-decoration-none text-secondary">Sobre nós</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-secondary">Políticas de privacidade</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-secondary">Termos de serviço</a></li>
            </ul>
          </div>

          {/* Coluna Contact */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold mb-3">Contact</h5>
            <ul className="list-unstyled text-secondary">
              <li className="mb-2"><a href="#" className="text-decoration-none text-secondary">FAQ</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-secondary">Entre em contato</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-secondary">Parcerias</a></li>
            </ul>
          </div>

          {/* Coluna Social */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold mb-3">Social</h5>
            <div className="d-flex gap-3">
              <a href="#" className="bg-white text-dark rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-white text-dark rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                <Twitter size={20} />
              </a>
              <a href="#" className="bg-white text-dark rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                <span className="fw-bold small">Tk</span>
              </a>
              <a href="#" className="bg-white text-dark rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-top border-secondary mt-4 pt-3 text-center">
          <small className="text-secondary">© Copyright 3JCP 2025</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;