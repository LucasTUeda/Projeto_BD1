package br.com.sistemaacademico.model;

public class Questao {

    private int idQuestao;
    private String enunciado;
    private String tipo;
    private double valorPonto;
    private String respostaCorreta;

    // Construto vazio
    public Questao(){
    }

    // Construtor completo
    public Questao(int idQuestao, String enunciado, String tipo, double valorPonto, String respostaCorreta){
        this.idQuestao = idQuestao;
        this.enunciado = enunciado;
        this.tipo = tipo;
        this.valorPonto = valorPonto;
        this.respostaCorreta = respostaCorreta;
    }

    // Getters e setters
    public int getIdQuestao(){
        return idQuestao;
    }

    public void setIdQuestao(int idQuestao){
        this.idQuestao = idQuestao;
    }

    public String getEnunciado(){
        return enunciado;
    }

    public void setEnunciado(String enunciado){
        this.enunciado = enunciado;
    }

    public String getTipo(){
        return tipo;
    }

    public void setTipo(String tipo){
        this.tipo = tipo;
    }

    public double getValorPonto(){
        return valorPonto;
    }

    public void setValorPonto(double valorPonto){
        this.valorPonto = valorPonto;
    }

    public String getRespostaCorreta(){
        return respostaCorreta;
    }

    public void setRespostaCorreta(String respostaCorreta){
        this.respostaCorreta = respostaCorreta;
    }
}
