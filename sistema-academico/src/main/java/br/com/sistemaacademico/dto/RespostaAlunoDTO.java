package br.com.sistemaacademico.dto;

public class RespostaAlunoDTO {

    private int idQuestao;
    private String textoResposta;

    // Construtor vazio
    public RespostaAlunoDTO(){}

    // Construtor completo
    public RespostaAlunoDTO(int idQuestao, String textoResposta){
        this.idQuestao = idQuestao;
        this.textoResposta = textoResposta;
    }

    // Getters e setters
    public int getIdQuestao(){
        return idQuestao;
    }

    public void setIdQuestao(int idQuestao){
        this.idQuestao = idQuestao;
    }

    public String getTextoResposta(){
        return textoResposta;
    }

    public void setTextoResposta(String textoResposta){
        this.textoResposta = textoResposta;
    }
}
