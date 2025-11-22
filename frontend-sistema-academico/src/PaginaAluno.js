import React from 'react';
import ListaAvaliacoesAluno from './ListaAvaliacoesAluno'; //

// Esta página mostra tudo que o aluno vê
function PaginaAluno({aluno}) {
    return (
        <div>
            <h2>Portal do Aluno</h2>
            <ListaAvaliacoesAluno matricula={aluno.id} />
            {/* Adicionar um componente "NotasAnteriores" aqui depois */}
        </div>
    );
}
export default PaginaAluno;