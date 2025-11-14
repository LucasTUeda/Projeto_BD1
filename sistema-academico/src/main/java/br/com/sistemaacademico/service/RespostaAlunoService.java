package br.com.sistemaacademico.service;

import br.com.sistemaacademico.controller.RespostaAlunoController;
import br.com.sistemaacademico.dao.RespostaAlunoDAO;
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
        respostaAlunoDAO.salvarResposta(numMatricula, idAvaliacao, respostas);
    }
}
