package br.com.sistemaacademico.dto;


import java.util.Date;

public class EvolucaoDTO {
    private String tituloAvaliacao;
    private Date data;
    private double nota;
    private String tendencia; // "Melhorou", "Piorou", "Estável" ou "Primeira Prova"

    public EvolucaoDTO(String tituloAvaliacao, Date data, double nota, String tendencia){
        this.tituloAvaliacao = tituloAvaliacao;
        this.data = data;
        this.nota = nota;
        this.tendencia = tendencia;
    }

    public String getTituloAvaliacao(){
        return tituloAvaliacao;
    }

    public void setTituloAvaliacao(String tituloAvaliacao){
        this.tituloAvaliacao = tituloAvaliacao;
    }

    public Date getData(){
        return data;
    }

    public void setData(Date data){
        this.data = data;
    }

    public double getNota(){
        return nota;
    }

    public void setNota(double nota){
        this.nota = nota;
    }

    public String getTendencia(){
        return tendencia;
    }

    public void setTendencia(String tendencia){
        this.tendencia = tendencia;
    }
}
