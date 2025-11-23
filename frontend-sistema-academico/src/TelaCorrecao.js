import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function TelaCorrecao() {
    const { idAvaliacao } = useParams(); // Pega o ID da URL
    const [matriculaAlvo, setMatriculaAlvo] = useState('');
    const [respostas, setRespostas] = useState([]);
    const [carregando, setCarregando] = useState(false);
    
    // Estado local para editar as notas antes de salvar
    // Formato: { idQuestao: valorDaNota }
    const [notasEditadas, setNotasEditadas] = useState({});

    const buscarProvaDoAluno = (e) => {
        e.preventDefault();
        setCarregando(true);

        fetch(`http://localhost:8080/api/respostas/correcao/aluno/${matriculaAlvo}/avaliacao/${idAvaliacao}`)
            .then(res => res.json())
            .then(dados => {
                setRespostas(dados);
                setCarregando(false);
            })
            .catch(err => {
                console.error(err);
                setCarregando(false);
                alert("Erro ao buscar respostas. Verifique a matrícula.");
            });
    };

    const handleNotaChange = (idQuestao, valor) => {
        setNotasEditadas(prev => ({
            ...prev,
            [idQuestao]: valor
        }));
    };

    const salvarNota = (idQuestao) => {
        const novaNota = notasEditadas[idQuestao];
        
        // Verifica se a nota foi digitada
        if (novaNota === undefined || novaNota === '') {
            alert("Digite uma nota antes de salvar.");
            return;
        }

        // Chama o endpoint de correção manual que criamos antes
        // URL: /api/respostas/corrigir-manual?matricula=...&idAvaliacao=...
        const params = new URLSearchParams({
            matricula: matriculaAlvo,
            idAvaliacao: idAvaliacao,
            idQuestao: idQuestao,
            nota: novaNota
        });

        fetch(`http://localhost:8080/api/respostas/corrigir-manual?${params}`, {
            method: 'PUT'
        }).then(res => {
            if (res.ok) {
                alert("Nota atualizada com sucesso!");
                // Atualiza a lista visualmente para mostrar que foi salvo
                setRespostas(prev => prev.map(r => {
                    if (r.idQuestao === idQuestao) {
                        return { ...r, notaObtida: parseFloat(novaNota) };
                    }
                    return r;
                }));
            } else {
                alert("Erro ao salvar nota.");
            }
        });
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
            <h2>Corrigir Avaliação #{idAvaliacao}</h2>

            {/* Parte 1: Selecionar o Aluno */}
            <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
                <form onSubmit={buscarProvaDoAluno} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <label><strong>Matrícula do Aluno:</strong></label>
                    <input 
                        type="number" 
                        value={matriculaAlvo} 
                        onChange={e => setMatriculaAlvo(e.target.value)}
                        placeholder="Ex: 2025001"
                        required
                    />
                    <button type="submit">Buscar Prova</button>
                </form>
            </div>

            {carregando && <p>Carregando...</p>}

            {/* Parte 2: Lista de Respostas */}
            {respostas.length > 0 && (
                <div>
                    {respostas.map((resp, index) => (
                        <div key={resp.idQuestao} style={{ border: '1px solid #ccc', marginBottom: '15px', padding: '15px', borderRadius: '8px' }}>
                            <h4 style={{ margin: '0 0 10px 0' }}>Questão {index + 1} (Vale: {resp.valorTotalQuestao} pts)</h4>
                            <p style={{ background: '#eee', padding: '10px', fontStyle: 'italic' }}>
                                "{resp.enunciado}"
                            </p>
                            
                            <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
                                <div style={{ flex: 1 }}>
                                    <strong>Resposta do Aluno:</strong>
                                    <p style={{ color: 'blue' }}>{resp.respostaAluno || "(Sem resposta)"}</p>
                                </div>
                                <div style={{ flex: 1, borderLeft: '1px solid #ddd', paddingLeft: '10px' }}>
                                    <strong>Gabarito:</strong>
                                    <p style={{ color: 'green' }}>{resp.respostaCorreta}</p>
                                </div>
                            </div>

                            <hr />

                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#fff3cd', padding: '10px' }}>
                                <label><strong>Nota Atribuída:</strong></label>
                                <input 
                                    type="number" 
                                    step="0.1"
                                    max={resp.valorTotalQuestao}
                                    min="0"
                                    style={{ width: '80px', padding: '5px' }}
                                    // Se estamos editando, mostra o valor editado. Se não, mostra o valor do banco.
                                    value={notasEditadas[resp.idQuestao] !== undefined ? notasEditadas[resp.idQuestao] : (resp.notaObtida || '')}
                                    onChange={(e) => handleNotaChange(resp.idQuestao, e.target.value)}
                                />
                                <button onClick={() => salvarNota(resp.idQuestao)} style={{ cursor: 'pointer' }}>
                                    Salvar Nota
                                </button>
                                {resp.notaObtida !== null && <span style={{ color: 'green', marginLeft: '10px' }}>✅ Nota salva: {resp.notaObtida}</span>}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default TelaCorrecao;