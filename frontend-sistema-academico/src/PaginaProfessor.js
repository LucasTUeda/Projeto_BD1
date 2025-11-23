import React, { useState, useEffect } from 'react';
import ListaDeQuestoes from './ListaDeQuestoes'; 
import FormularioQuestao from './FormularioQuestao'; 
import FormularioAvaliacao from './FormularioAvaliacao'; 

// Esta página usa a mesma lógica de "estado elevado" que o App.js usava antes
function PaginaProfessor({professor}) {
    const [questoes, setQuestoes] = useState([]);
    const [questaoEmEdicao, setQuestaoEmEdicao] = useState(null);

    const [avaliacoes, setAvaliacoes] = useState([]);

    const fetchQuestoes = () => {
        fetch('http://localhost:8080/api/questoes/listar') //
            .then(res => res.json())
            .then(dados => setQuestoes(dados))
            .catch(erro => console.error("Erro ao carregar questões:", erro));
    };

    const fetchAvaliacoes = () => {
        if(professor && professor.id){
            fetch(`http://localhost:8080/api/avaliacoes/professor/${professor.id}`)
            .then(res => res.json())
            .then(dados => setAvaliacoes(dados))
            .catch(erro => console.error("Erro avaliações:", erro))
        }
    }

    useEffect(() => { 
        fetchQuestoes();
        fetchAvaliacoes();
     }, [professor]);

    const handleSaveOrDelete = () => {
        setQuestaoEmEdicao(null);
        fetchQuestoes();
        fetchAvaliacoes();
    };

    const handleEdit = (questao) => {
        setQuestaoEmEdicao(questao);
    };

    return (
        <div>
            <h2>Portal do Professor</h2>
            <FormularioAvaliacao 
                onDelete={handleSaveOrDelete} 
                listaDeAvaliacoes={avaliacoes}
                idProfessorLogado={professor.id}
            />

            <hr style={{margin: '20px 0'}}/>

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