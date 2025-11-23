package br.com.sistemaacademico.service;

import br.com.sistemaacademico.dao.AvaliacaoDAO;
import br.com.sistemaacademico.dao.AvaliacaoQuestaoDAO;
import br.com.sistemaacademico.dto.AvaliacaoDetalhadaDTO;
import br.com.sistemaacademico.model.Avaliacao;
import br.com.sistemaacademico.dto.AvaliacaoDTO;
import br.com.sistemaacademico.model.Questao;
import br.com.sistemaacademico.dao.QuestaoDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class AvaliacaoService {

    private AvaliacaoDAO avaliacaoDAO;
    private AvaliacaoQuestaoDAO avaliacaoQuestaoDAO;
    private QuestaoDAO questaoDAO;

    @Autowired
    public AvaliacaoService(AvaliacaoDAO avaliacaoDAO, AvaliacaoQuestaoDAO avaliacaoQuestaoDAO, QuestaoDAO questaoDAO){
        this.avaliacaoDAO = avaliacaoDAO;
        this.avaliacaoQuestaoDAO = avaliacaoQuestaoDAO;
        this.questaoDAO = questaoDAO;
    }

    @Transactional
    public int criarNovaAvaliacao(AvaliacaoDTO dto){
        Avaliacao novaAvaliacao = new Avaliacao();
        novaAvaliacao.setTitulo(dto.getTitulo());
        novaAvaliacao.setDataFim(dto.getDataFim());
        novaAvaliacao.setIdProfessor(dto.getIdProfessor());
        novaAvaliacao.setIdDisciplina(dto.getIdDisciplina());

        int novoIdAvaliacao = avaliacaoDAO.salvar(novaAvaliacao);
        List<Integer> idQuestoes = dto.getIdQuestoes();
        avaliacaoQuestaoDAO.salvarAssociacoes(novoIdAvaliacao, idQuestoes);

        return novoIdAvaliacao;
    }

    public List<Avaliacao> buscarPendentes(int matricula) {
        // Por enquanto, o service apenas repassa a chamada para o DAO
        return avaliacaoDAO.findPendentesByMatricula(matricula);
    }

    public AvaliacaoDetalhadaDTO buscarDetalhesAvaliacao(int idAvaliacao) {

        // 1. Busca a avaliação principal (título, data...)
        Avaliacao avaliacao = avaliacaoDAO.buscarPorId(idAvaliacao);
        if (avaliacao == null) {
            return null; // Ou jogue uma exceção
        }

        // 2. Busca a lista de IDs de questões (ex: [1, 3, 5])
        List<Integer> idsQuestoes = avaliacaoQuestaoDAO.findQuestaoIdsByAvaliacaoId(idAvaliacao);

        // 3. Busca cada objeto Questão completo
        List<Questao> questoesCompletas = new ArrayList<>();
        for (int idQuestao : idsQuestoes) {
            Questao questao = questaoDAO.buscarPorId(idQuestao); // Usa o DAO que já tínhamos
            if (questao != null) {
                questao.setRespostaCorreta(null); // SEGURANÇA: Remove a resposta correta antes de enviar para o aluno
                questoesCompletas.add(questao);
            }
        }

        // 4. Monta e retorna o DTO de resposta
        return new AvaliacaoDetalhadaDTO(avaliacao, questoesCompletas);
    }

    public void excluirAvaliacao(int idAvaliacao){
        avaliacaoDAO.excluirAvaliacao(idAvaliacao);
    }

    public List<Avaliacao> buscarPorProfessor(int idProfessor){
        return avaliacaoDAO.buscarPorProfessor(idProfessor);
    }
}

