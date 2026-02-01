  // src/App.js
  import React from 'react';
  import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
  import { AuthProvider } from './contexts/authContext';


  // Componentes Globais
  import Header from './components/Header'; // Assumindo que quer o Header em todas as rotas
  import Footer from './components/Footer'; // Assumindo que quer o Footer em todas as rotas

  // Páginas Gerais
  import Home from './pages/Home';
  import Parceiros from './pages/Parceiros';
  import SolicitarParceria from './pages/SolicitarParceria';

  // Páginas de Usuário
  import Login from './pages/usuario/Login';
  import Cadastro from './pages/usuario/Cadastro';

  // Páginas de Administração / Gestão
  import TelaPainelAdmin from './pages/TelaPainelAdmin';
  import TelaListagemSolicitacoes from './pages/TelaListagemSolicitacoes';

  // Páginas de Eventos
  import ListaEventos from './pages/evento/ListaEventos';
  import CadastroEvento from './pages/evento/CadastroEvento';
  import EditarEvento from './pages/evento/EditarEvento';

  // Páginas de Pontos Turísticos
  import ListaPontosTuristicos from './pages/pontosturistico/ListaPontosTuristicos';
  import CadastroPontoTuristico from './pages/pontosturistico/CadastroPontoTuristico';
  import EditarPontoTuristico from './pages/pontosturistico/EditarPontoTuristico';

  // Páginas de Promoções
  import CadastroPromocao from './pages/promocao/CadastroPromocao';
  import EditarPromocao from './pages/promocao/EditarPromocao';
  import CadastroTipoPromocao from './pages/promocao/tipopromocao/CadastroTipoPromocao';
  import EditarTipoPromocao from './pages/promocao/tipopromocao/EditarTipoPromocao';
  import ListarTiposPromocao from './pages/promocao/tipopromocao/ListarTiposPromocao';
  import ListarPromocoes from './pages/promocao/ListarPromocoes';


  // Páginas de reserva
  import ListaReservas from './pages/reserva/ListaReservas';
  import Reserva from './pages/Reserva';

  // Página de avaliação
  import TelaAvaliacoes from './pages/avaliacoes/TelaAvaliacoes';

  function App() {
    return (
      <BrowserRouter>
        {/* O AuthProvider deve envolver as Rotas para fornecer o contexto de usuário */}
        <AuthProvider>
          <div className="App">
            {/* Se o Header for fixo para todas as páginas, ele fica aqui */}
            {<Header /> } 
            
            <Routes>
              {/* --- Rotas Públicas --- */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/parceiros" element={<Parceiros />} />
              <Route path="/solicitar-parceria" element={<SolicitarParceria />} />
              
              {/* --- Rotas de Funcionalidades --- */}
              <Route path="/reservas" element={<Reserva />} />
              <Route path="/lista-reservas" element={<ListaReservas />} />
              
              {/* --- Pontos Turísticos --- */}
              <Route path="/pontos-turisticos" element={<ListaPontosTuristicos />} />
              <Route path="/pontos-turisticos/novo" element={<CadastroPontoTuristico />} />
              <Route path="/pontos-turisticos/editar/:id" element={<EditarPontoTuristico />} />
              
              {/* --- Eventos --- */}
              <Route path="/eventos" element={<ListaEventos />} />
              <Route path="/eventos/novo" element={<CadastroEvento />} />
              <Route path="/eventos/editar/:id" element={<EditarEvento />} />
              
              {/* --- Promoções --- */}
              <Route path="/promocoes/nova" element={<CadastroPromocao />} />
              <Route path="/promocoes/editar/:id" element={<EditarPromocao />} />
              <Route path="/tipos-promocao/novo" element={<CadastroTipoPromocao />} />
              <Route path="/tipos-promocao/editar/:id" element={<EditarTipoPromocao />} />
              <Route path="/promocoes" element={<ListarPromocoes />} />
              <Route path="/tipos-promocao" element={<ListarTiposPromocao />} />

              {/* --- Administração --- */}
              <Route path="/admin" element={<TelaPainelAdmin />} />
              <Route path="/admin/solicitacoes" element={<TelaListagemSolicitacoes />} />

              {/* --- Avaliações --- */}
              <Route path="/avaliacoes" element={<TelaAvaliacoes />} />
              
              {/* Rota para lidar com URLs inexistentes (404) */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

            {<Footer /> }
          </div>
        </AuthProvider>
      </BrowserRouter>
    );
  }
  
  export default App;