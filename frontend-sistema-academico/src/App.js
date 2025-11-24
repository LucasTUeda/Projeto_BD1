import React, {useState} from 'react';
// 1. Import dos componentes de rota
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'; 

// 2. Import dos "componentes-página"
import PaginaProfessor from './PaginaProfessor';
import PaginaAluno from './PaginaAluno';
import ResponderAvaliacao from './ResponderAvaliacao'; 
import TelaLogin from './TelaLogin';
import TelaCorrecao from './TelaCorrecao';
import TelaRelatorios from './TelaRelatorios';

function App() {
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (usuario) => {
    setUsuarioLogado(usuario);

    if(usuario.tipo === 'professor'){
      navigate('/professor');
    } else {
      navigate('/');
    }
  }

  const handleLogout = () => {
    setUsuarioLogado(null);
    navigate('/login');
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', width: '900px', margin: 'auto' }}>
      <header style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #eee', paddingBottom: '10px', marginBottom: '20px'}}>
        <h1>Sistema de Avaliação</h1>

        {usuarioLogado && (
          <div>
            <span>Olá, {usuarioLogado.tipo} <strong>#{usuarioLogado.id}</strong></span>
            <button onClick={handleLogout} style={{ marginLeft: '10px', background: '#ffdddd', border: '1px solid red' }}>Sair</button>
          </div>
        )}
      </header>
        
        {/* Componente renderizar para qual URL */}
        <Routes>
          {/*Rota de Login */}
          <Route path="/login" element={<TelaLogin onLogin={handleLogin}/>} /> 
          
          <Route 
          path="/" 
          element={
            usuarioLogado && usuarioLogado.tipo === 'aluno'
            ? <PaginaAluno aluno={usuarioLogado}/>
            : <Navigate to="/login"/>
            } 
          /> 

          <Route 
          path="/professor" 
          element={
            usuarioLogado && usuarioLogado.tipo === 'professor'
            ? <PaginaProfessor professor={usuarioLogado}/>
            : <Navigate to="/login"/>
            } 
          /> 

          <Route 
          path="/avaliacao/:idAvaliacao" 
          element={
            usuarioLogado 
            ? <ResponderAvaliacao aluno={usuarioLogado}/>
            : <Navigate to="/login"/>
            } 
          /> 

          <Route
          path="/professor/corrigir/:idAvaliacao"
          element={
            usuarioLogado && usuarioLogado.tipo === 'professor'
            ? <TelaCorrecao />
            : <Navigate to="/login" />
            }
          />

          <Route
          path="/professor/relatorios"
          element={
            usuarioLogado && usuarioLogado.tipo === 'professor'
            ? <TelaRelatorios />
            : <Navigate to="/login" />
            }
          />

        </Routes>
    </div>
  );
}

export default App;