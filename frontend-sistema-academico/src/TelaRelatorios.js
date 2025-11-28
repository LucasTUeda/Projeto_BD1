import React, {useState, useEffect} from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function TelaRelatorios(){

    // ESTADOS DO RANKING
    const [ranking, setRanking] = useState([]);
    const [idDisciplina, setIdDisciplina] = useState(1); // Começa com a Disciplina 1
    
    // ESTADOS DO DESEMPENHO
    const [matriculaAnalise, setMatriculaAnalise] = useState('');
    const [desempenho, setDesempenho] = useState(null);

    // ESTADO DE ANALISE QUESTÕES
    const [analiseQuestoes, setAnaliseQuestoes] = useState([]);

    useEffect(() => {
        carregarRanking();
        carregarAnaliseQuestoes();
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

    const carregarAnaliseQuestoes = () => {
        fetch(`http://localhost:8080/api/relatorios/questoes/disciplina/${idDisciplina}`)
            .then(res => res.json())
            .then(dados => { 
                if (Array.isArray(dados)){
                    setAnaliseQuestoes(dados);
                } else {
                    console.error("API não retornou lista:", dados);
                    setAnaliseQuestoes([]);
                }
            })       
            .catch(err => {
                console.error("Erro analise questoes:", err);
                setAnaliseQuestoes([]);
            }); 
    }

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

            {/* ----- RELATORIO - ANÁLISE DE QUESTÕES -------*/}  
            <div style={{ marginTop: '30px', border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
                <h3>🧩 Análise de Dificuldade das Questões</h3>
                <p>Baseado na taxa de acerto dos alunos.</p>

                {analiseQuestoes && analiseQuestoes.length > 0 && (
                    <div style={{ height: '300px', marginBottom: '20px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={analiseQuestoes}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis 
                                    dataKey="enunciado" 
                                    tickFormatter={(value) => value.substring(0, 10) + "..."} // Corta texto longo
                                />
                                <YAxis domain={[0, 100]} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="taxaAcerto" name="Taxa de Acerto (%)" fill="#8884d8">
                                    {/* Lógica para pintar a barra condicionalmente */}
                                    {analiseQuestoes.map((entry, index) => (
                                        <cell key={`cell-${index}`} fill={entry.taxaAcerto > 70 ? '#28a745' : (entry.taxaAcerto < 30 ? '#dc3545' : '#ffc107')} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}

                {!analiseQuestoes || !Array.isArray(analiseQuestoes) || analiseQuestoes.length === 0 ? (
                    <p>Sem dados suficientes.</p>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                        <thead>
                            <tr style={{ background: '#333', color: 'white' }}>
                                <th style={{ padding: '10px', textAlign: 'left' }}>Questão</th>
                                <th style={{ padding: '10px' }}>Respostas</th>
                                <th style={{ padding: '10px' }}>Taxa de Acerto</th>
                                <th style={{ padding: '10px' }}>Dificuldade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {analiseQuestoes.map((q, index) => (
                                <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '10px' }}>{q.enunciado}</td>
                                    <td style={{ padding: '10px', textAlign: 'center' }}>{q.totalRespostas}</td>
                                    <td style={{ padding: '10px', textAlign: 'center' }}>
                                        {/* Barra de progresso simples */}
                                        <div style={{ background: '#eee', width: '100px', height: '10px', margin: 'auto', borderRadius: '5px' }}>
                                            <div style={{ 
                                                width: `${q.taxaAcerto}%`, 
                                                background: q.taxaAcerto > 70 ? 'green' : (q.taxaAcerto < 30 ? 'red' : 'orange'),
                                                height: '100%', borderRadius: '5px' 
                                            }}></div>
                                        </div>
                                        <small>{q.taxaAcerto.toFixed(1)}%</small>
                                    </td>
                                    <td style={{ padding: '10px', textAlign: 'center' }}>
                                        <span style={{ 
                                            padding: '5px 10px', borderRadius: '15px', color: 'white', fontWeight: 'bold',
                                            backgroundColor: q.nivelDificuldade === 'Fácil' ? 'green' : (q.nivelDificuldade === 'Difícil' ? 'red' : 'orange')
                                        }}>
                                            {q.nivelDificuldade}
                                        </span>
                                    </td>
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