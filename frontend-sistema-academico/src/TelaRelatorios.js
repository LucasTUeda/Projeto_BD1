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
        <div>
            <h2>📊 Relatórios de Desempenho</h2>

            <div>
                <h3>Ranking Geral - Disciplina {idDisciplina} </h3>

               {ranking.length === 0 ? (
                    <p>Sem dados suficientes para gerar ranking.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <tr>Posição</tr>
                                <tr>Aluno</tr>
                                <tr>Pontuação Acumulada</tr>
                            </tr>
                        </thead>
                    <tbody>
                        {ranking.map((item, index) => (
                            <tr>
                                <td>
                                    {item.posicao}º 
                                    {item.posicao === 1 && "🥇"}
                                    {item.posicao === 2 && "🥈"}
                                    {item.posicao === 3 && "🥉"}
                                </td>
                                <td>{item.nomeAluno}</td>
                                <td>{item.notaTotal} pts</td>
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