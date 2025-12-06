import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// --- IMPORT DOS COMPONENTES ---
import Header from './components/Header';
import Footer from './components/Footer';

// --- IMPORT DAS PÁGINAS ---
import Home from './pages/Home';
import Cadastro from './pages/usuario/Cadastro'; 
import Login from './pages/usuario/Login'; 
import CadastroPontoTuristico from './pages/pontosturistico/CadastroPontoTuristico';
import EditarPontoTuristico from './pages/pontosturistico/EditarPontoTuristico';
import ListaPontosTuristicos from './pages/pontosturistico/ListaPontosTuristicos';
import CadastroEvento from './pages/evento/CadastroEvento';
import EditarEvento from './pages/evento/EditarEvento';
import ListaEventos from './pages/evento/ListaEventos';
import CadastroTipoPromocao from './pages/promocao/tipopromocao/CadastroTipoPromocao';
import EditarTipoPromocao from './pages/promocao/tipopromocao/EditarTipoPromocao';
import CadastroPromocao from './pages/promocao/CadastroPromocao';
import EditarPromocao from './pages/promocao/EditarPromocao';
import SelecionarEventoPontoTuristico from './pages/Reserva';
import SolicitarParceria from './pages/SolicitarParceria';


const App = () => {
    return (
        <Router>
            {/* Estrutura Flexbox para rodapé fixo */}
            <div className="d-flex flex-column min-vh-100 bg-light">
                
                {/* Header fixo no topo */}
                <Header />
                
                {/* Main: Ocupa o espaço restante da tela */}
                <main className="flex-grow-1">
                    <Routes>
                        {/* Rota Inicial */}
                        <Route path="/" element={<Home />} />

                        {/* Rotas de Autenticação */}
                        <Route path="/cadastro" element={<Cadastro />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/SolicitarParceria" element={<SolicitarParceria />} />

                        {/* Rotas de Ponto Turistico */}
                        <Route path="/cadastro-ponto" element={<CadastroPontoTuristico />} />
                        <Route path="/editar-ponto" element={<EditarPontoTuristico />} />
                        <Route path="/pontos-turisticos" element={<ListaPontosTuristicos />} />

                        {/* Rotas de Evento */}
                        <Route path="/cadastro-evento" element={<CadastroEvento />} />
                        <Route path="/editar-evento" element={<EditarEvento />} />
                        <Route path="/eventos" element={<ListaEventos />} />
                        <Route path="/fazer-reserva" element={<SelecionarEventoPontoTuristico />} />

                        {/* Rotas de Promocao */}
                        <Route path="/cadastro-tipo-promocao" element={<CadastroTipoPromocao />} />
                        <Route path="/editar-tipo-promocao" element={<EditarTipoPromocao />} />
                        <Route path="/cadastro-promocao" element={<CadastroPromocao />} />
                        <Route path="/editar-promocao" element={<EditarPromocao />} />

                        {/* Rota 404 para urls erradas */}
                        <Route path="*" element={<div className="text-center mt-5">Página não encontrada</div>} />
                    </Routes>
                </main>

                {/* Footer fixo na base */}
                <Footer />
            
            </div>
        </Router>
    );
};

export default App;