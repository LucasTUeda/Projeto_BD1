package br.com.sistemaacademico.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;
import java.util.List;

public class AvaliacaoDTO {

    private String titulo;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date dataFim;
    private int idProfessor;
    private int idDisciplina;
    private List<Integer> idQuestoes;


    //Contrutor vazio
    public AvaliacaoDTO(){
    }

    //Contrutor completo
    public AvaliacaoDTO(String titulo, Date dataFim, int idProfessor, int idDisciplina){
        this.titulo = titulo;
        this.dataFim = dataFim;
        this.idProfessor = idProfessor;
        this.idDisciplina = idDisciplina;
    }

    //Getters e setters
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

    public List<Integer> getIdQuestoes(){
        return idQuestoes;
    }

    public void setIdQuestoes(List<Integer> idQuestoes){
        this.idQuestoes = idQuestoes;
    }
}
