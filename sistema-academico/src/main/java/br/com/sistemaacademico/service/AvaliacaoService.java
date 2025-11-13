package br.com.sistemaacademico.service;

import br.com.sistemaacademico.dao.AvaliacaoDAO;
import br.com.sistemaacademico.dao.AvaliacaoQuestaoDAO;
import br.com.sistemaacademico.model.Avaliacao;
import br.com.sistemaacademico.model.AvaliacaoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AvaliacaoService {

    private AvaliacaoDAO avaliacaoDAO;
    private AvaliacaoQuestaoDAO avaliacaoQuestaoDAO;

    @Autowired
    public AvaliacaoService(AvaliacaoDAO avaliacaoDAO, AvaliacaoQuestaoDAO avaliacaoQuestaoDAO){
        this.avaliacaoDAO = avaliacaoDAO;
        this.avaliacaoQuestaoDAO = avaliacaoQuestaoDAO;
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

}

