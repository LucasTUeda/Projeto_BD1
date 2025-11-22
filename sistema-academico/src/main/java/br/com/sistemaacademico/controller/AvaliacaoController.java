package br.com.sistemaacademico.controller;

import br.com.sistemaacademico.dto.AvaliacaoDTO;
import br.com.sistemaacademico.dto.AvaliacaoDetalhadaDTO;
import br.com.sistemaacademico.model.Avaliacao;
import br.com.sistemaacademico.service.AvaliacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/avaliacoes")
@CrossOrigin("*")
public class AvaliacaoController {
    private final AvaliacaoService avaliacaoService;

    @Autowired
    public AvaliacaoController (AvaliacaoService avaliacaoService){
        this.avaliacaoService = avaliacaoService;
    }

    @PostMapping("/criar")
    public int criarAvaliacao(@RequestBody AvaliacaoDTO avaliacaoDTO){
        return avaliacaoService.criarNovaAvaliacao(avaliacaoDTO);
    }

    @GetMapping("/aluno/{matricula}")
    public List<Avaliacao> listarAvaliacoesPendentes(@PathVariable int matricula) {
        return avaliacaoService.buscarPendentes(matricula);
    }

    @GetMapping("/{id}")
    public AvaliacaoDetalhadaDTO buscarAvaliacaoPorId(@PathVariable int id) {
        return avaliacaoService.buscarDetalhesAvaliacao(id);
    }

    @DeleteMapping("/{id}")
    public void excluirAvaliacaoPorId(@PathVariable int id){
        avaliacaoService.excluirAvaliacao(id);
        System.out.println("Avaliação" + id + " excluída com sucesso!");
    }

}
