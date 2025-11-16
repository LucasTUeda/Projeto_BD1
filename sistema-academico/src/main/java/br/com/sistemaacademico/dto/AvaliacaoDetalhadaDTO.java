package br.com.sistemaacademico.dto;

import br.com.sistemaacademico.model.Avaliacao;
import br.com.sistemaacademico.model.Questao;
import java.util.List;

// Este DTO é usado para ENVIAR os detalhes completos
// da prova para o frontend (React)
public class AvaliacaoDetalhadaDTO {

    private Avaliacao avaliacao; // Os dados principais (título, data, etc.)
    private List<Questao> questoes; // A lista de questões completas

    // Construtor
    public AvaliacaoDetalhadaDTO(Avaliacao avaliacao, List<Questao> questoes) {
        this.avaliacao = avaliacao;
        this.questoes = questoes;
    }

    // Getters e Setters
    public Avaliacao getAvaliacao() {
        return avaliacao;
    }
    public void setAvaliacao(Avaliacao avaliacao) {
        this.avaliacao = avaliacao;
    }
    public List<Questao> getQuestoes() {
        return questoes;
    }
    public void setQuestoes(List<Questao> questoes) {
        this.questoes = questoes;
    }
}