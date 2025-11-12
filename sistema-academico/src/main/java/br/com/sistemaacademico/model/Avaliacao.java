package br.com.sistemaacademico.model;

import java.util.Date;

public class Avaliacao {
    private int idAvaliacao;
    private String titulo;
    private Date dataFim;
    private int idProfessor;
    private int idDisciplina;

    //Contrutor vazio
    public Avaliacao(){
    }

    //Contrutor completo
    public Avaliacao(int idAvaliacao, String titulo, Date dataFim, int idProfessor, int idDisciplina){
        this.idAvaliacao = idAvaliacao;
        this.titulo = titulo;
        this.dataFim = dataFim;
        this.idProfessor = idProfessor;
        this.idDisciplina = idDisciplina;
    }

    //Getters e setters
    public int getIdAvaliacao(){
        return idAvaliacao;
    }

    public void setIdAvaliacao(int idAvaliacao){
        this.idAvaliacao = idAvaliacao;
    }

    public String getTitulo(){
        return titulo;
    }

    public void setTitulo(String titulo){
        this.titulo = titulo;
    }

    public Date getDataFim(){
        return dataFim;
    }

    public void setDataFim(Date dataFim){
        this.dataFim = dataFim;
    }

    public int getIdProfessor(){
        return idProfessor;
    }

    public void setIdProfessor(int idProfessor){
        this.idProfessor = idProfessor;
    }

    public int getIdDisciplina(){
        return idDisciplina;
    }

    public void setIdDisciplina(int idDisciplina){
        this.idDisciplina = idDisciplina;
    }
}
