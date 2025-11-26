import React, {useState, useEffect} from 'react';

function TelaRelatorios(){
    const [ranking, setRanking] = useState([]);
    const [idDisciplina, setIdDisciplina] = useState(1); // Começa com a Disciplina 1
    
    useEffect(() => {
        carregarRanking();
    }, [idDisciplina]);

    const carregarRanking = () => {
        fetch(`http://localhost:8080/api/relatorios/ranking/disciplina/${idDisciplina}`)
            .then(res => res.json())
            .then(dados => setRanking(dados))
            .catch(err => console.error("Erro ao carregar ranking:", err));       
    }

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
            <h2>📊 Relatórios de Desempenho</h2>

            <div style={{ marginTop: '20px', border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
                <h3>🏆 Ranking Geral - Disciplina {idDisciplina} </h3>

               {ranking.length === 0 ? (
                    <p>Sem dados suficientes para gerar ranking.</p>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                        <thead>
                            <tr style={{ background: '#6200ea', color: 'white' }}>
                                <th style={{ padding: '10px' }}>Posição</th>
                                <th style={{padding: '10px', textAlign: 'left'}}>Aluno</th>
                                <th style={{ padding: '10px' }}>Pontuação Acumulada</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ranking.map((item, index) => (
                                <tr key={index} style={{ background: index % 2 === 0 ? '#f9f9f9' : 'white', textAlign: 'center' }}>
                                    <td style={{ padding: '10px', fontWeight: 'bold' }}> 
                                        {item.posicao}º 
                                        {item.posicao === 1 && "🥇"}
                                        {item.posicao === 2 && "🥈"}
                                        {item.posicao === 3 && "🥉"}
                                    </td>
                                    <td style={{ padding: '10px', textAlign: 'left' }}>{item.nomeAluno}</td>
                                    <td style={{ padding: '10px', color: 'green', fontWeight: 'bold' }}>{item.notaTotal} pts</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )} 
            </div>
        </div>
    );

}

export default TelaRelatorios;