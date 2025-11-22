import React, { useState, useEffect } from 'react';
// 1. Import do 'useParams' para ler a URL
import { useParams, useNavigate } from 'react-router-dom'; 

function ResponderAvaliacao({aluno}) {
    
    // 2. Use o useParams para ler o ID da URL
    // O nome 'idAvaliacao' deve ser o mesmo da Rota no App.js: "/avaliacao/:idAvaliacao"
    const { idAvaliacao } = useParams(); 
    
    // Hook para navegar para outra página após o envio
    const navigate = useNavigate(); 

    // --- Estados para os dados ---
    const [avaliacao, setAvaliacao] = useState(null);
    const [questoes, setQuestoes] = useState([]);
    const [loading, setLoading] = useState(true);

    // Estado para armazenar as respostas (Ex: { 1: "Resposta A", 2: "Resposta B" })
    const [respostasMap, setRespostasMap] = useState({});

    // --- Efeito para Buscar a Prova ---
    // Roda sempre que o 'idAvaliacao' da URL mudar
    useEffect(() => {
        // Ele só roda se o idAvaliacao for válido
        if (idAvaliacao) { 
            setLoading(true);
            // Chama a API de detalhes da avaliação
            fetch(`http://localhost:8080/api/avaliacoes/${idAvaliacao}`)
                .then(res => res.json())
                .then(dados => {
                    setAvaliacao(dados.avaliacao); // Pega o objeto 'avaliacao'
                    setQuestoes(dados.questoes);   // Pega a lista 'questoes'
                    setLoading(false);
                })
                .catch(erro => {
                    console.error("Erro ao buscar detalhes da avaliação:", erro);
                    setLoading(false);
                });
        }
    }, [idAvaliacao]); // O gatilho é a mudança do ID na URL

    // --- Função para atualizar o estado das respostas ---
    // Chamada toda vez que o aluno digita em uma caixa
    const handleRespostaChange = (idQuestao, texto) => {
        setRespostasMap(prevMap => ({
            ...prevMap,  // Copia o mapa antigo
            [idQuestao]: texto // Atualiza (ou adiciona) a resposta da questão
        }));
    };

    // --- Função para Enviar o formulário ---
    const handleSubmit = (e) => {
        e.preventDefault();

        // 1. Converter o Map {1: "A"} no Array de DTOs [{idQuestao: 1, textoResposta: "A"}]
        // que a API espera.
        const listaDeRespostasDTO = Object.keys(respostasMap).map(idQuestao => ({
            idQuestao: parseInt(idQuestao),
            textoResposta: respostasMap[idQuestao]
        }));
        
        // Verifica se todas as questões foram respondidas (opcional, mas bom)
        if (listaDeRespostasDTO.length !== questoes.length) {
            alert('Por favor, responda todas as questões.');
            return;
        }

        // 2. Chamar a API de submissão
        fetch(`http://localhost:8080/api/respostas/aluno/${aluno.id}/avaliacao/${idAvaliacao}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(listaDeRespostasDTO) // Envia o array de DTOs
        })
        .then(resposta => {
            if (resposta.ok) {
                alert('Respostas enviadas com sucesso!');
                // Navega o usuário de volta para a página inicial
                navigate('/'); 
            } else {
                alert('Falha ao enviar respostas. Verifique o console (F12).');
            }
        })
        .catch(erro => console.error("Erro ao submeter respostas:", erro));
    };


    // --- Renderização (com formulário) ---
    if (loading) {
        return <p>Carregando prova...</p>;
    }
    if (!avaliacao) {
        return <p>Erro ao carregar ou avaliação não encontrada.</p>;
    }

    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            
            <form onSubmit={handleSubmit}>
                <h2>Respondendo: {avaliacao.titulo}</h2>
                <p>Data Limite: {new Date(avaliacao.dataFim).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</p>
                
                <hr />

                <h3>Questões da Prova:</h3>
                {questoes.map(q => (
                    <div key={q.idQuestao} style={{borderBottom: '1px solid #eee', marginBottom: '10px', paddingBottom: '10px'}}>
                        <p><strong>({q.valorPonto} pts) {q.enunciado}</strong></p>
                        
                        {/* Se for 'alternativa', mostra botões de rádio */}
                        {q.tipo === 'alternativa' ? (
                            <div>
                                <label>
                                    <input 
                                        type="radio" 
                                        name={`questao-${q.idQuestao}`} 
                                        value="A" 
                                        onChange={(e) => handleRespostaChange(q.idQuestao, e.target.value)} 
                                        required 
                                    /> A
                                </label>
                                <label style={{ marginLeft: '10px' }}>
                                    <input 
                                        type="radio" 
                                        name={`questao-${q.idQuestao}`} 
                                        value="B" 
                                        onChange={(e) => handleRespostaChange(q.idQuestao, e.target.value)} 
                                        required 
                                    /> B
                                </label>
                                <label style={{ marginLeft: '10px' }}>
                                    <input 
                                        type="radio" 
                                        name={`questao-${q.idQuestao}`} 
                                        value="C" 
                                        onChange={(e) => handleRespostaChange(q.idQuestao, e.target.value)} 
                                        required 
                                    /> C
                                </label>
                                    <label style={{ marginLeft: '10px' }}>
                                    <input 
                                        type="radio" 
                                        name={`questao-${q.idQuestao}`} 
                                        value="D" 
                                        onChange={(e) => handleRespostaChange(q.idQuestao, e.target.value)} 
                                        required 
                                    /> D
                                </label>
                                    <label style={{ marginLeft: '10px' }}>
                                    <input 
                                        type="radio" 
                                        name={`questao-${q.idQuestao}`} 
                                        value="E" 
                                        onChange={(e) => handleRespostaChange(q.idQuestao, e.target.value)} 
                                        required 
                                    /> E
                                </label>
                                {/* Adicionar mais opções conforme necessário */}
                            </div>
                        ) : (
                            /* Se for 'dissertativa', mostra caixa de texto */
                            <textarea 
                                placeholder="Digite sua resposta aqui..."
                                style={{ width: '90%', minHeight: '50px' }}
                                value={respostasMap[q.idQuestao] || ''} 
                                onChange={(e) => handleRespostaChange(q.idQuestao, e.target.value)}
                                required 
                            />
                        )}
                    </div>
                ))}
                
                <button type="submit">Enviar Respostas</button>
            </form>
        </div>
    );
}

export default ResponderAvaliacao;