package br.com.sistemaacademico.controller;

import br.com.sistemaacademico.dao.QuestaoDAO;
import br.com.sistemaacademico.model.Questao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/questoes")
public class QuestaoController {
    private final QuestaoDAO questaoDAO;

    @Autowired
    public QuestaoController(QuestaoDAO questaoDAO){
        this.questaoDAO = questaoDAO;
    }

    @PostMapping("/cadastrar")
    public void cadastrarQuestao(@RequestBody Questao questao){
        try{
            questaoDAO.cadastrarQuestao(questao);
            System.out.println("Controller: Questão recebida e enviada para o DAO.");
        } catch (Exception e){
            System.err.println("Erro ao cadastrar questão: " + e.getMessage());
        }
    }
}
