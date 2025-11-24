package br.com.sistemaacademico.dto;

public class RankingDTO {
    private String nomeAluno;
    private double notaTotal;
    private int posicao;

    public RankingDTO(String nomeAluno, double notaTotal, int posicao) {
        this.nomeAluno = nomeAluno;
        this.notaTotal = notaTotal;
        this.posicao = posicao;
    }

    // Getters e Setters
    public String getNomeAluno() {
        return nomeAluno;
    }
    public void setNomeAluno(String nomeAluno) {
        this.nomeAluno = nomeAluno;
    }

    public double getNotaTotal() {
        return notaTotal;
    }
    public void setNotaTotal(double notaTotal) {
        this.notaTotal = notaTotal;
    }

    public int getPosicao() {
        return posicao;
    }
    public void setPosicao(int posicao) {
        this.posicao = posicao;
    }
}
