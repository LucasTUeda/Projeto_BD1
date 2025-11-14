package br.com.sistemaacademico.controller;

import br.com.sistemaacademico.dto.RespostaAlunoDTO;
import br.com.sistemaacademico.service.RespostaAlunoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/respostas")
public class RespostaAlunoController {
    private RespostaAlunoService respostaAlunoService;

    @Autowired
    public RespostaAlunoController(RespostaAlunoService respostaAlunoService){
        this.respostaAlunoService = respostaAlunoService;
    }

    @PostMapping("/aluno/{numMatricula}/avaliacao/{idAvaliacao}")
    public void receberSubmissao(@PathVariable int numMatricula, @PathVariable int idAvaliacao, @RequestBody List<RespostaAlunoDTO> respostas){
        // O Controller chama o Service com todos os dados coletados
        respostaAlunoService.submeterRespostas(numMatricula, idAvaliacao, respostas);
    }
}
