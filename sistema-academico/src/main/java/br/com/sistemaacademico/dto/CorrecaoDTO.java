package br.com.sistemaacademico.dto;

public class CorrecaoDTO {
    private int idQuestao;
    private String enunciado;
    private String respostaAluno;
    private String respostaCorreta;
    private double valorTotalQuestao;
    private Double notaObtida; // Double objeto pois pode ser null

    public CorrecaoDTO(int idQuestao, String enunciado, String respostaAluno, String respostaCorreta, double valorTotalQuestao,
                       Double notaObtida){
        this.idQuestao = idQuestao;
        this.enunciado = enunciado;
        this.respostaAluno = respostaAluno;
        this.respostaCorreta = respostaCorreta;
        this.valorTotalQuestao = valorTotalQuestao;
        this.notaObtida = notaObtida;
    }

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

    public String getRespostaAluno(){
        return respostaAluno;
    }

    public void setRespostaAluno(String respostaAluno){
        this.respostaAluno = respostaAluno;
    }

    public String getRespostaCorreta(){
        return respostaCorreta;
    }

    public void setRespostaCorreta(String respostaCorreta){
        this.respostaCorreta = respostaCorreta;
    }

    public double getValorTotalQuestao(){
        return valorTotalQuestao;
    }

    public  void setValorTotalQuestao(double valorTotalQuestao){
        this.valorTotalQuestao = valorTotalQuestao;
    }

    public Double getNotaObtida(){
        return notaObtida;
    }

    public void setNotaObtida(Double notaObtida){
        this.notaObtida = notaObtida;
    }
}
