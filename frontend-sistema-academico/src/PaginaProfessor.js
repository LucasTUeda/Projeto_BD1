import React, { useState, useEffect } from 'react';
import ListaDeQuestoes from './ListaDeQuestoes'; 
import FormularioQuestao from './FormularioQuestao'; 
import FormularioAvaliacao from './FormularioAvaliacao'; 

// Esta página usa a mesma lógica de "estado elevado" que o App.js usava antes
function PaginaProfessor() {
    const [questoes, setQuestoes] = useState([]);
    const [questaoEmEdicao, setQuestaoEmEdicao] = useState(null);

    const fetchQuestoes = () => {
        fetch('http://localhost:8080/api/questoes/listar') //
            .then(res => res.json())
            .then(dados => setQuestoes(dados))
            .catch(erro => console.error("Erro ao carregar questões:", erro));
    };

    useEffect(() => { fetchQuestoes(); }, []);

    const handleSaveOrDelete = () => {
        setQuestaoEmEdicao(null);
        fetchQuestoes();
    };

    const handleEdit = (questao) => {
        setQuestaoEmEdicao(questao);
    };

    return (
        <div>
            <h2>Portal do Professor</h2>
            <FormularioAvaliacao />
            <FormularioQuestao 
                dadosIniciais={questaoEmEdicao} 
                onSave={handleSaveOrDelete} 
            />
            <ListaDeQuestoes 
                listaDeQuestoes={questoes} 
                onDelete={handleSaveOrDelete} 
                onEdit={handleEdit} 
            />
        </div>
    );
}
export default PaginaProfessor;