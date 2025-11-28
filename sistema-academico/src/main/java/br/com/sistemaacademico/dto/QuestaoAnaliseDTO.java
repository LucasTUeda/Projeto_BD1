package br.com.sistemaacademico.dto;

public class QuestaoAnaliseDTO {
    private String enunciado;
    private int totalRespostas;
    private double taxaAcerto; // Ex: 75.5 (%)
    private String nivelDificuldade; // "Fácil", "Média", "Difícil"

    public QuestaoAnaliseDTO (String enunciado, int totalRespostas, double taxaAcerto, String nivelDificuldade){
        this.enunciado = enunciado;
        this.totalRespostas = totalRespostas;
        this.taxaAcerto = taxaAcerto;
        this.nivelDificuldade = nivelDificuldade;
    }

    // Getters e Setters
    public String getEnunciado(){
        return enunciado;
    }

    public void setEnunciado(String enunciado){
        this.enunciado = enunciado;
    }

    public int getTotalRespostas(){
        return totalRespostas;
    }

    public void setTotalRespostas(int totalRespostas){
        this.totalRespostas = totalRespostas;
    }

    public double getTaxaAcerto(){
        return taxaAcerto;
    }

    public void setTaxaAcerto(double taxaAcerto){
        this.taxaAcerto = taxaAcerto;
    }

    public String getNivelDificuldade(){
        return nivelDificuldade;
    }

    public void setNivelDificuldade(String nivelDificuldade){
        this.nivelDificuldade = nivelDificuldade;
    }
}
