package br.com.sistemaacademico.dto;

public class DesempenhoDTO {
    private Double mediaAluno;
    private Double mediaTurma;

    public DesempenhoDTO(Double mediaAluno, Double mediaTurma){
        this.mediaAluno = mediaAluno;
        this.mediaTurma = mediaTurma;
    }

    public Double getMediaAluno(){
        return mediaAluno;
    }

    public void setMediaAluno(Double mediaAluno){
        this.mediaAluno = mediaAluno;
    }

    public Double getMediaTurma(){
        return mediaTurma;
    }

    public void setMediaTurma(Double mediaTurma){
        this.mediaTurma = mediaTurma;
    }
}
