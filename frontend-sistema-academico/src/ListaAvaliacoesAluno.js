import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // 1. Import do Link

function ListaAvaliacoesAluno() {
    
    const [avaliacoes, setAvaliacoes] = useState([]);
    const matriculaAlunoLogado = 2025001; 

    useEffect(() => {
        fetch(`http://localhost:8080/api/avaliacoes/aluno/${matriculaAlunoLogado}`) 
            .then(res => res.json())
            .then(dados => setAvaliacoes(dados));
    }, [matriculaAlunoLogado]);

    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <h2>Minhas Avaliações Pendentes</h2>
            
            {avaliacoes.length === 0 ? (
                <p>Nenhuma avaliação pendente no momento.</p>
            ) : (
                <ul>
                    {avaliacoes.map(av => (
                        <li key={av.idAvaliacao}>
                            <strong>{av.titulo}</strong>
                            <br />
                            <span>Data Limite: {new Date(av.dataFim).toLocaleDateString()}</span>
                            <br />
                            
                            {/* 2. Transforma o <button> em <Link> */}
                            <Link to={`/avaliacao/${av.idAvaliacao}`}>
                                Responder Prova
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ListaAvaliacoesAluno;