import React, { useState, useEffect } from 'react';
import ListaDeQuestoes from './ListaDeQuestoes';
import FormularioQuestao from './FormularioQuestao';
import FormularioAvaliacao from './FormularioAvaliacao';

function App() {
  
  // --- ESTADO PRINCIPAL ---
  const [listaDeQuestoes, setListaDeQuestoes] = useState([]);
  // Guarda o objeto da questão que o usuário clicou para "Editar"
  const [questaoParaEditar, setQuestaoParaEditar] = useState(null);

  // --- FUNÇÃO PARA BUSCAR DADOS ---
  // Esta função será chamada no início e após salvar/excluir
  const carregarQuestoes = () => {
    fetch('http://localhost:8080/api/questoes/listar')
      .then(res => res.json())
      .then(dados => setListaDeQuestoes(dados))
      .catch(erro => console.error("Erro ao carregar questões:", erro));
  };

  // --- CICLO DE VIDA ---
  // Roda uma vez quando o App carrega
  useEffect(() => {
    carregarQuestoes();
  }, []); // [] = Roda só uma vez

  // --- HANDLERS (Funções de Callback) ---

  // Chamado pelo FormularioQuestao ou ListaDeQuestoes quando algo é salvo/excluído
  const handleSaveOrDelete = () => {
    setQuestaoParaEditar(null); // Limpa o formulário de edição
    carregarQuestoes(); // Recarrega a lista do banco
  };

  // Chamado pela ListaDeQuestoes quando o botão "Editar" é clicado
  const handleEdit = (questao) => {
    setQuestaoParaEditar(questao);
  };

  // --- RENDERIZAÇÃO ---
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', width: '900px', margin: 'auto' }}>
      <h1>Sistema de Avaliação</h1>
      
      <hr />
      
      {/* O Formulário de Avaliação é independente, 
        pois ele busca seus próprios dados (questões, professores, etc.)
      */}
      <FormularioAvaliacao />
      
      <hr />

      {/* O Formulário de Questão recebe a questão para editar
        e a função 'onSave' para chamar quando terminar.
      */}
      <FormularioQuestao 
        dadosIniciais={questaoParaEditar} 
        onSave={handleSaveOrDelete} 
      />
      
      <hr />

      {/* A Lista de Questões recebe a lista de dados
        e as funções 'onDelete' e 'onEdit' para chamar quando clicadas.
      */}
      <ListaDeQuestoes 
        listaDeQuestoes={listaDeQuestoes} 
        onDelete={handleSaveOrDelete} 
        onEdit={handleEdit} 
      />
    </div>
  );
}

export default App;