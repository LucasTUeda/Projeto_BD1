import React, {useState, useEffect} from 'react';

function TelaRelatorios(){

    // ESTADOS DO RANKING
    const [ranking, setRanking] = useState([]);
    const [idDisciplina, setIdDisciplina] = useState(1); // Começa com a Disciplina 1
    
    // ESTADOS DO DESEMPENHO
    const [matriculaAnalise, setMatriculaAnalise] = useState('');
    const [desempenho, setDesempenho] = useState(null);

    useEffect(() => {
        carregarRanking();
    }, [idDisciplina]);

    const carregarRanking = () => {
        fetch(`http://localhost:8080/api/relatorios/ranking/disciplina/${idDisciplina}`)
            .then(res => res.json())
            .then(dados => setRanking(dados))
            .catch(err => console.error("Erro ao carregar ranking:", err));       
    };

    const buscarDesempenho = (e) => {
        e.preventDefault();
        if(!matriculaAnalise) return;

        fetch(`http://localhost:8080/api/relatorios/desempenho/disciplina/${idDisciplina}/aluno/${matriculaAnalise}`)
            .then(res => res.json())
            .then(dados => setDesempenho(dados))
            .catch(err => alert("Erro ao buscar desempenho. Verifique a matricula"));
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
            <h2>📊 Relatórios de Desempenho</h2>

            {/* ----- RELATORIO - RANKING -------*/}  
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

            {/* ----- RELATORIO - DESEMPENHO -------*/}  
            <div>
                <h3>📈 Análise de desempenho (comparativo)</h3>
                <p>Compare a média de um aluno com a média geral da turma</p>

                <form onSubmit={buscarDesempenho}>
                    <input
                        type="number"
                        placeholder="Matrícula do aluno (ex: 2025001)"
                        value={matriculaAnalise}
                        onChange={e => setMatriculaAnalise(e.target.value)}
                    />
                    <button type="submit">Comparar</button>
                </form>

                {desempenho && (
                    <div>
                        {/* Card do Aluno */}
                        <div>
                            <h4>Média do Aluno</h4>
                            <h1>{desempenho.mediaAluno ? desempenho.mediaAluno.toFixed(1) : '-'}</h1>
                            <small>Em todas as provas</small>
                        </div>

                        {/* Card da Turma */}
                        <div>
                            <h4>Média da Turma</h4>
                            <h1>{desempenho.mediaTurma ? desempenho.mediaTurma.toFixed(1) : '-'}</h1>
                            <small>Média geral da disciplina</small>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );

}

export default TelaRelatorios;