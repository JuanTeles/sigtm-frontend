import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { Tag } from 'lucide-react';
import { 
  MapPin, 
  Calendar, 
  LayoutGrid, 
  Church, 
  Trophy, 
  Utensils, 
  Drama, 
  Music,
  ChevronLeft,
  ChevronRight,
  ArrowRightCircle
} from 'lucide-react';

const Home = () => {
    useEffect(() => {
        document.title = 'Home - Irecê';
    }, []);

    const categorias = [
        { nome: "Todos", icone: <LayoutGrid size={24} />, cor: "text-gray-500", border: "border-gray-300" },
        { nome: "Religiosidade", icone: <Church size={24} />, cor: "text-blue-600", border: "border-blue-600" },
        { nome: "Esportes", icone: <Trophy size={24} />, cor: "text-purple-600", border: "border-purple-600" },
        { nome: "Gastronomia", icone: <Utensils size={24} />, cor: "text-orange-500", border: "border-orange-500" },
        { nome: "Cultura", icone: <Drama size={24} />, cor: "text-green-500", border: "border-green-500" },
        { nome: "Música", icone: <Music size={24} />, cor: "text-yellow-500", border: "border-yellow-500" },
    ];

    // Dados atualizados para o São João de Irecê
    const eventos = [
        {
            id: 1,
            titulo: "São João de Irecê 2025",
            data: "De 20 a 24 de Junho",
            descricao: "O maior São João da Bahia! Grandes atrações no Palco Dori Caymmi e tradição na Cidade do Forró.",
        },
        {
            id: 2,
            titulo: "Tradicional Desfile de Carroças",
            data: "Dia 06 de Junho",
            descricao: "Abertura oficial dos festejos juninos com cortejo cultural pelas ruas do centro da cidade.",
        },
        {
            id: 3,
            titulo: "São Pedro da Boa Vista",
            data: "De 28 a 29 de Junho",
            descricao: "A festa continua no bairro Boa Vista com muito forró pé de serra, comidas típicas e alegria.",
        }
    ];

    return (
        <div className="d-flex flex-column w-100">
            
            {/* --- HERO SECTION (Topo sem imagem) --- */}
            <div className="position-relative bg-light d-flex align-items-end justify-content-center" style={{ height: '300px' }}>
                {/* Espaço reservado para imagem de fundo futura */}
            </div>

            {/* --- CONTEÚDO PRINCIPAL (Card Sobreposto) --- */}
            <div className="container" style={{ marginTop: '-100px', position: 'relative', zIndex: 10 }}>
                
                <div className="card border-0 shadow-lg rounded-4 p-4 mb-5">
                    <div className="card-body text-center text-md-start">
                        <h2 className="fw-bold mb-2" style={{ color: '#0099ff' }}>Bem vindo a IRECÊ!</h2>
                        <p className="text-secondary fs-5 mb-4">Explore lindos lugares e tenha experiências unicas</p>

                        <div className="row g-3">

                            {/* Botão Pontos Turísticos */}
                            <div className="col-md-4">
                                <Link 
                                    to="/pontos-turisticos" 
                                    className="btn w-100 py-3 rounded-pill text-white d-flex align-items-center justify-content-center gap-2 shadow-sm text-decoration-none" 
                                    style={{ backgroundColor: '#3b82f6' }}
                                >
                                    <div className="bg-white bg-opacity-25 rounded-circle p-1"><MapPin size={20} /></div>
                                    <div className="text-start lh-1">
                                        <div className="fw-bold">Pontos Turísticos</div>
                                        <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>Fique por dentro dos queridinhos da cidade</div>
                                    </div>
                                </Link>
                            </div>

                            {/* Botão Agenda de Eventos */}
                            <div className="col-md-4">
                                <Link 
                                    to="/eventos" 
                                    className="btn w-100 py-3 rounded-pill text-dark d-flex align-items-center justify-content-center gap-2 shadow-sm text-decoration-none" 
                                    style={{ backgroundColor: '#facc15' }}
                                >
                                    <div className="bg-black bg-opacity-10 rounded-circle p-1"><Calendar size={20} /></div>
                                    <div className="text-start lh-1">
                                        <div className="fw-bold">Agenda de Eventos</div>
                                        <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Saiba tudo o que está rolando em Irecê</div>
                                    </div>
                                </Link>
                            </div>

                            {/* ⭐ NOVO BOTÃO – PROMOÇÕES */}
                            <div className="col-md-4">
                                <Link 
                                    to="/promocoes" 
                                    className="btn w-100 py-3 rounded-pill text-dark d-flex align-items-center justify-content-center gap-2 shadow-sm text-decoration-none" 
                                    style={{ backgroundColor: '#61dafb' }} 
                                >
                                    <div className="bg-white bg-opacity-25 rounded-circle p-1"><Tag size={20} /></div>
                                    <div className="text-start lh-1">
                                        <div className="fw-bold">Promoções</div>
                                        <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>Ofertas e experiências imperdíveis</div>
                                    </div>
                                </Link>
                            </div>

                        </div>

                    </div>
                </div>

                {/* --- SEÇÃO EXPERIÊNCIAS --- */}
                <div className="text-center mb-5 pb-4">
                    <h3 className="fw-bold mb-4 text-uppercase">Experiências em Irecê</h3>
                    
                    <div className="d-flex flex-wrap justify-content-center gap-4 align-items-start">
                        {categorias.map((cat, index) => (
                            <div key={index} className="d-flex flex-column align-items-center" style={{ width: '100px' }}>
                                <div className={`rounded-circle border-2 d-flex align-items-center justify-content-center mb-2 ${cat.border} ${cat.cor}`} style={{ width: '70px', height: '70px', borderWidth: '3px', borderStyle: 'solid', cursor: 'pointer', backgroundColor: 'white' }}>
                                    {cat.icone}
                                </div>
                                <span className="fw-bold text-secondary small">{cat.nome}</span>
                            </div>
                        ))}
                    </div>

                    <div className="d-flex justify-content-center gap-3 mt-4">
                        <button className="btn btn-light rounded-circle border shadow-sm p-2"><ChevronLeft size={20} className="text-secondary" /></button>
                        <button className="btn btn-light rounded-circle border shadow-sm p-2"><ChevronRight size={20} className="text-secondary" /></button>
                    </div>
                </div>


            </div>

        </div>
    );
};

export default Home;