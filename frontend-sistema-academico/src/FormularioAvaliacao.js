import React, { useState, useEffect } from 'react';

function FormularioAvaliacao({onDelete, listaDeAvaliacoes}) {
    
    // --- 1. GERENCIAMENTO DE ESTADO ---
    
    const [formData, setFormData] = useState({
        titulo: '',
        dataFim: '',
        idProfessor: 4, 
        idDisciplina: 1 
    });

    // Estados para os dados buscados da API
    const [todasQuestoes, setTodasQuestoes] = useState([]);
    const [professores, setProfessores] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);
    
    // Estado para a seleção
    const [questoesSelecionadas, setQuestoesSelecionadas] = useState([]);
    
    // --- Estado para o filtro de busca ---
    const [filtroQuestao, setFiltroQuestao] = useState('');

    
    // --- 2. BUSCAR OS DADOS (Questões, Professores, Disciplinas) ---
    useEffect(() => {
        // (Precisará criar estes endpoints no backend)
        
        fetch('http://localhost:8080/api/questoes/listar')
            .then(res => res.json())
            .then(dados => setTodasQuestoes(dados))
            .catch(erro => console.error("Erro ao buscar questões:", erro));

        // fetch('http://localhost:8080/api/professores')
        //     .then(res => res.json())
        //     .then(dados => {
        //         setProfessores(dados);
        //         if (dados.length > 0) setFormData(prev => ({...prev, idProfessor: dados[0].idProfessor}));
        //     });
        
        // fetch('http://localhost:8080/api/disciplinas')
        //     .then(res => res.json())
        //     .then(dados => {
        //         setDisciplinas(dados);
        //         if (dados.length > 0) setFormData(prev => ({...prev, idDisciplina: dados[0].idDisciplina}));
        //     });
            
    }, []); // O [] vazio garante que isso rode só uma vez

    
    // --- 3. LÓGICA DO FORMULÁRIO ---
    
    // Handler para os inputs (texto, data, selects)
    const handleChange = (e) => {
        const { name, value, type } = e.target;
        
        // Converte para número se for select de ID
        const valorProcessado = (name === 'idProfessor' || name === 'idDisciplina') 
            ? parseInt(value) 
            : value;

        setFormData(prev => ({
            ...prev,
            [name]: valorProcessado
        }));
    };

    // Handler para a CHECKLIST 
    const handleChecklistChange = (e) => {
        const idQuestao = parseInt(e.target.value);
        const isChecked = e.target.checked;

        if (isChecked) {
            setQuestoesSelecionadas(prev => [...prev, idQuestao]);
        } else {
            setQuestoesSelecionadas(prev => prev.filter(id => id !== idQuestao));
        }
    };
    
    // Handler para o SUBMIT (Salvar a Avaliação)
    const handleSubmit = (e) => {
        e.preventDefault();

        const avaliacaoDTO = {
            ...formData, 
            idQuestoes: questoesSelecionadas // (Atenção ao nome do campo no DTO)
        };

        fetch('http://localhost:8080/api/avaliacoes/criar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(avaliacaoDTO)
        })
        .then(resposta => {
            if (resposta.ok) {
                alert('Avaliação criada com sucesso!');
                // Limpa o formulário (opcional)
                setFormData({ ...formData, titulo: '', dataFim: '' });
                setQuestoesSelecionadas([]);
                setFiltroQuestao('');
                onDelete();
            } else {
                alert('Falha ao criar avaliação.');
            }
        });
    };

    const handleExcluir = (idAvaliacao) => {
        if (!window.confirm("Tem certeza que deseja excluir esta AVALIAÇÃO? Isso apagará as respostas dos alunos!")){
            return;
        }

        fetch(`http://localhost:8080/api/avaliacoes/${idAvaliacao}`,{
            method: 'DELETE'
        })
        .then(resposta => {
            if (resposta.ok) {
                alert('Avaliação excluída!');
                onDelete(); // Avisa o App.js para recarregar a lista
            } else {
                alert('Falha ao excluir.');
            }
        });
    };

    
    // --- 4. A RENDERIZAÇÃO (JSX) ---
    
    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}> 
            <form onSubmit={handleSubmit} >
                <h3>Criar Nova Avaliação</h3>
                
                <div>
                    <label>Título: </label>
                    <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} required />
                </div>
                <div>
                    <label>Data Limite:</label>
                    <input type="date" name="dataFim" value={formData.dataFim} onChange={handleChange} required />
                </div>

                {/* --- MELHORIA: Dropdowns (Selects) --- */}
                {/* <div>
                    <label>Professor: </label>
                    <select name="idProfessor" value={formData.idProfessor} onChange={handleChange}>
                        {professores.map(prof => (
                            <option key={prof.idProfessor} value={prof.idProfessor}>
                                {prof.nome} 
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Disciplina: </label>
                    <select name="idDisciplina" value={formData.idDisciplina} onChange={handleChange}>
                        {disciplinas.map(disc => (
                            <option key={disc.idDisciplina} value={disc.idDisciplina}>
                                {disc.nome}
                            </option>
                        ))}
                    </select>
                </div>
                */}
                
                <hr />
                
                <h4>Selecione as Questões: </h4>
                
                {/* --- Filtro de Busca --- */}
                <div>
                    <label>Filtrar Questões: </label>
                    <input 
                        type="text" 
                        value={filtroQuestao} 
                        onChange={(e) => setFiltroQuestao(e.target.value)} 
                        placeholder="Digite o enunciado..."
                        style={{ width: '80%' }}
                    />
                </div>

                {/* A Checklist de Questões com Filtro */}
                <div style={{ maxHeight: '200px', overflowY: 'scroll', border: '1px solid #eee', padding: '5px' }}>
                    {todasQuestoes
                        .filter(questao => 
                            // Filtra o enunciado (ignorando maiúsculas/minúsculas)
                            questao.enunciado.toLowerCase().includes(filtroQuestao.toLowerCase())
                        )
                        .map(questao => (
                            <div key={questao.idQuestao}>
                                <input
                                    type="checkbox"
                                    value={questao.idQuestao}
                                    onChange={handleChecklistChange}
                                    checked={questoesSelecionadas.includes(questao.idQuestao)}
                                />
                                <label> (ID: {questao.idQuestao}) {questao.enunciado}</label>
                            </div>
                        ))}
                </div>
                <br/>
                <button type="submit">Salvar Avaliação</button>
            </form>                        
                
                <hr />
            

                <h4>Minha Lista de Avaliações</h4>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#f4f4f4' }}>
                            <th style={{ padding: '8px', border: '1px solid #ddd' }}>ID</th>
                            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Título</th>
                            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Ações</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {/* Lemos a lista das 'props' */}
                        {listaDeAvaliacoes.map(avaliacao => (
                            <tr key={avaliacao.idAvaliacao}>
                                <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{avaliacao.idAvaliacao}</td>
                                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{avaliacao.titulo}</td>
                                <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>
                                    <button onClick={() => handleExcluir(avaliacao.idAvaliacao)} style={{ marginRight: '5px' }}>
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <hr />
                
        </div>                
    );
}

export default FormularioAvaliacao;