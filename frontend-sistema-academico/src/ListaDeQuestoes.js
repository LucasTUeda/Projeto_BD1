import React from 'react';

// Recebe a lista e as funções do App.js via 'props'
function ListaDeQuestoes({ listaDeQuestoes, onDelete, onEdit }) {

    // A função de excluir chama o backend
    const handleExcluir = (idDaQuestao) => {
        if (!window.confirm("Tem certeza que deseja excluir esta questão?")) {
            return;
        }

        fetch(`http://localhost:8080/api/questoes/${idDaQuestao}`, {
            method: 'DELETE',
        })
        .then(resposta => {
            if (resposta.ok) {
                alert('Questão excluída!');
                onDelete(); // Avisa o App.js para recarregar a lista
            } else {
                alert('Falha ao excluir.');
            }
        });
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <h2>Minha Lista de Questões</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ background: '#f4f4f4' }}>
                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>ID</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Enunciado</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>Tipo</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>Pontos</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Lemos a lista das 'props' */}
                    {listaDeQuestoes.map(questao => (
                        <tr key={questao.idQuestao}>
                            <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{questao.idQuestao}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{questao.enunciado}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{questao.tipo}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{questao.valorPonto}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>
                                <button onClick={() => handleExcluir(questao.idQuestao)} style={{ marginRight: '5px' }}>
                                    Excluir
                                </button>
                                
                                {/* Chama a função 'onEdit' do App.js, passando o objeto */}
                                <button onClick={() => onEdit(questao)}>
                                    Editar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListaDeQuestoes;