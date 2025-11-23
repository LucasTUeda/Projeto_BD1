package br.com.sistemaacademico.service;

import br.com.sistemaacademico.controller.RespostaAlunoController;
import br.com.sistemaacademico.dao.RespostaAlunoDAO;
import br.com.sistemaacademico.dto.CorrecaoDTO;
import br.com.sistemaacademico.dto.RespostaAlunoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RespostaAlunoService {
    private RespostaAlunoDAO respostaAlunoDAO;

    @Autowired
    public RespostaAlunoService(RespostaAlunoDAO respostaAlunoDAO){
        this.respostaAlunoDAO = respostaAlunoDAO;
    }

    @Transactional
    public void submeterRespostas(int numMatricula, int idAvaliacao, List<RespostaAlunoDTO> respostas){
        // Salva a resposta
        respostaAlunoDAO.salvarResposta(numMatricula, idAvaliacao, respostas);

        // Roda a correção automática imediatamente após salvar
        respostaAlunoDAO.calcularNotasAutomaticas(numMatricula, idAvaliacao);

        System.out.println("Respostas salvas e notas de múltipla escolha calculadas para matrícula: " + numMatricula);
    }

    public void atualizarNotaManual(int numMatricula, int idAvaliacao, int idQuestao, double novaNota){
        respostaAlunoDAO.atualizarNotaManual(numMatricula, idAvaliacao, idQuestao, novaNota);
    }

    public List<CorrecaoDTO> buscarParaCorrecao(int matricula, int idAvaliacao){
        return respostaAlunoDAO.buscarRespostasCorrecao(matricula, idAvaliacao);
    }
}
