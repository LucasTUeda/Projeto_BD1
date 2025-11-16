import React from 'react';
// 1. Import dos componentes de rota
import { Routes, Route, Link } from 'react-router-dom'; 

// 2. Import dos "componentes-página"
import PaginaProfessor from './PaginaProfessor';
import PaginaAluno from './PaginaAluno';
import ResponderAvaliacao from './ResponderAvaliacao'; //

function App() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', width: '900px', margin: 'auto' }}>
      <h1>Sistema de Avaliação</h1>
      
      {/* 3. Links de navegação */}
      <nav>
        <Link to="/">Página do Aluno</Link> | <Link to="/professor">Página do Professor</Link>
      </nav>
      
      <hr />

      {/* 4. Componente renderizar para qual URL */}
      <Routes>
        <Route path="/" element={<PaginaAluno />} />
        <Route path="/professor" element={<PaginaProfessor />} />
        {/* Esta é a rota especial: /avaliacao/ QUALQUER_ID */}
        <Route path="/avaliacao/:idAvaliacao" element={<ResponderAvaliacao />} />
      </Routes>
    </div>
  );
}

export default App;