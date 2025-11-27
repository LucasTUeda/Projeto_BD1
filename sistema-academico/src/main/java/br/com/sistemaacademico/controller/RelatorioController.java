package br.com.sistemaacademico.controller;

import br.com.sistemaacademico.dao.RelatorioDAO;
import br.com.sistemaacademico.dto.DesempenhoDTO;
import br.com.sistemaacademico.dto.RankingDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/relatorios")
@CrossOrigin("*")
public class RelatorioController {
    private final RelatorioDAO relatorioDAO;

    @Autowired
    public RelatorioController(RelatorioDAO relatorioDAO){
        this.relatorioDAO = relatorioDAO;
    }

    @GetMapping("/ranking/disciplina/{idDisciplina}")
    public List<RankingDTO> getRanking(@PathVariable int idDisciplina){
        return relatorioDAO.gerarRankingPorDisciplina(idDisciplina);
    }

    @GetMapping("/desempenho/disciplina/{idDisciplina}/aluno/{matricula}")
    public DesempenhoDTO getDesempenho(@PathVariable int idDisciplina,
                                       @PathVariable int matricula){
        return relatorioDAO.obterDesempenhoComparativo(idDisciplina, matricula);
    }

}
