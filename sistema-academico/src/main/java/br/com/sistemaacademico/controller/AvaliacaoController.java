package br.com.sistemaacademico.controller;

import br.com.sistemaacademico.model.AvaliacaoDTO;
import br.com.sistemaacademico.service.AvaliacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/avaliacoes")
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


}
