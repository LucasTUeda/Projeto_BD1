import React, { useState, useEffect } from 'react'; 

// Estado inicial movido para fora para ser reutilizável
const estadoInicial = {
    enunciado: '',
    tipo: 'alternativa',
    valorPonto: 0.0,
    respostaCorreta: ''
};

function FormularioQuestao({ dadosIniciais, onSave }) {
    
    const [formData, setFormData] = useState(estadoInicial);
    
    // Roda toda vez que 'dadosIniciais' mudar
    useEffect(() => {
        if (dadosIniciais) {
            // Modo Edição: preenche o formulário
            setFormData(dadosIniciais);
        } else {
            // Modo Criação: limpa o formulário
            setFormData(estadoInicial);
        }
    }, [dadosIniciais]); // Gatilho

    
    const handleSubmit = (evento) => {
        evento.preventDefault();

        const modoEdicao = formData.idQuestao > 0;
        
        const url = modoEdicao 
            ? `http://localhost:8080/api/questoes/${formData.idQuestao}` 
            : 'http://localhost:8080/api/questoes/cadastrar';
        
        const method = modoEdicao ? 'PUT' : 'POST';

        // --- Prepara o DTO para envio ---
        const dadosParaEnviar = {
            enunciado: formData.enunciado,
            tipo: formData.tipo,
            valorPonto: formData.valorPonto,
            respostaCorreta: formData.respostaCorreta
        };

        // Adiciona o ID apenas se estiver em modo de edição
        if (modoEdicao) {
            dadosParaEnviar.idQuestao = formData.idQuestao;
        }

        fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosParaEnviar) // Envia o DTO limpo
        })
        .then(resposta => {
            if (resposta.ok) {
                alert(modoEdicao ? 'Questão atualizada!' : 'Questão cadastrada!');
                onSave(); // Avisa o App.js para recarregar
            } else {
                alert('Falha ao salvar questão.');
            }
        });
    }

    // Handler genérico para inputs
    const handleChange = (e) => {
        const { name, value, type } = e.target;
        let valorProcessado = value;
        if (type === 'number') valorProcessado = parseFloat(value) || 0; // Evita NaN

        setFormData(prevState => ({
            ...prevState,
            [name]: valorProcessado
        }));
    };

    return (
        <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <h3>{formData.idQuestao > 0 ? 'Editar Questão' : 'Cadastrar Nova Questão'}</h3>

            <div>
                <label>Enunciado: </label>
                <input type="text" name="enunciado" value={formData.enunciado} onChange={handleChange} required />
            </div>
            
            <div>
                <label>Tipo: </label>
                <input type="radio" name="tipo" value="alternativa" checked={formData.tipo === 'alternativa'} onChange={handleChange}/> Alternativa
                <input type="radio" name="tipo" value="dissertativa" checked={formData.tipo === 'dissertativa'} onChange={handleChange}/> Dissertativa
            </div>
            
            <div>
                <label>Valor Ponto:</label>
                <input type="number" step="0.1" name="valorPonto" value={formData.valorPonto} onChange={handleChange} />
            </div>

            <div>
                <label>Resposta Correta: </label>
                <input type="text" name="respostaCorreta" value={formData.respostaCorreta} onChange={handleChange} />
            </div>

            <button type="submit">{formData.idQuestao > 0 ? 'Atualizar' : 'Salvar'}</button>
            
            {/* Botão para limpar/cancelar a edição */}
            {formData.idQuestao > 0 && (
                <button type="button" onClick={() => setFormData(estadoInicial)}>
                    Cancelar Edição
                </button>
            )}
        </form>
    );
}

export default FormularioQuestao;