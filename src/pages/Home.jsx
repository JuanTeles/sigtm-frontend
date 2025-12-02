import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; 
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
                            <div className="col-md-6">
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
                            <div className="col-md-6">
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

            {/* --- SEÇÃO: AGENDA SÃO JOÃO --- */}
            <div className="w-100 py-5" style={{ backgroundColor: '#fbbf24' }}>
                <div className="container">
                    
                    {/* Header da Agenda - Atualizado para JUNHO */}
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 text-dark gap-3">
                        <button className="btn btn-dark rounded-pill px-4 py-2 d-flex align-items-center gap-2 shadow-sm" style={{ backgroundColor: '#333' }}>
                            Selecionar Data <Calendar size={18} />
                        </button>
                        
                        <div className="d-flex align-items-center gap-3">
                            <h2 className="fw-bold mb-0 text-dark">Junho</h2>
                            {/* Datas dos dias principais da festa */}
                            <div className="d-flex align-items-baseline gap-2 fs-3 opacity-50 fw-bold">
                                <span>21</span>
                                <span>22</span>
                                <span>23</span>
                                <span>24</span>
                                <span>25</span>
                                <ArrowRightCircle size={24} className="text-dark" />
                            </div>
                        </div>
                    </div>

                    {/* Cards de Eventos (Sem fotos) */}
                    <div className="row g-4">
                        {eventos.map((evento) => (
                            <div key={evento.id} className="col-md-4">
                                <div className="card h-100 border-0 rounded-4 shadow-sm">
                                    <div className="card-body p-4 d-flex flex-column">
                                        <div className="d-flex align-items-center gap-2 text-secondary mb-2 small fw-bold">
                                            <Calendar size={16} /> {evento.data}
                                        </div>
                                        <h5 className="card-title fw-bold mb-2">{evento.titulo}</h5>
                                        <p className="card-text text-secondary small flex-grow-1">{evento.descricao}</p>
                                        
                                        <a href="#" className="text-info fw-bold text-decoration-none d-flex align-items-center gap-2 mt-3" style={{ color: '#0099ff' }}>
                                            <ArrowRightCircle size={20} /> Saiba mais
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer da Agenda */}
                    <div className="d-flex justify-content-between align-items-center mt-5">
                        <button className="btn btn-dark rounded-pill px-4 py-2 fw-bold" style={{ backgroundColor: '#333' }}>
                            Agenda Completa
                        </button>
                        
                        <div className="d-flex gap-2">
                            <button className="btn btn-outline-dark border-0 bg-white bg-opacity-25 rounded px-3 py-2">
                                <ChevronLeft size={24} />
                            </button>
                            <button className="btn btn-outline-dark border-0 bg-white bg-opacity-25 rounded px-3 py-2">
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Home;