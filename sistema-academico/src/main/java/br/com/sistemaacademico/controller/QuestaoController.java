package br.com.sistemaacademico.controller;

import br.com.sistemaacademico.dao.QuestaoDAO;
import br.com.sistemaacademico.model.Questao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questoes")
@CrossOrigin("*")
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

    @GetMapping("/listar")
    public List<Questao> listarQuestoes(){
        try {
            return questaoDAO.buscarTodas();
        } catch (Exception e){
            System.err.println("Erro ao listar questões: " + e.getMessage());
            return null;
        }
    }

    @GetMapping("/{id}")
    public Questao buscarQuestaoPorId(@PathVariable int id) {
        // retorna o objeto
        return questaoDAO.buscarPorId(id);
    }

    @DeleteMapping("/{id}")
    public void excluirQuestao(@PathVariable int id) {
        // O @PathVariable pega o valor "{id}" da URL e joga nesta variável 'id'
        questaoDAO.excluir(id);
        System.out.println("Questao " + id + " excluída com sucesso");
    }

    @PutMapping("/{id}")
    public void atualizarQuestao(@PathVariable int id, @RequestBody Questao questao){
        questao.setIdQuestao(id);
        questaoDAO.atualizarQuestao(questao);
    }
}
