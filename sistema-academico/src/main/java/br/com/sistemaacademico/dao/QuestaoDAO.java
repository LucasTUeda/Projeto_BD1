package br.com.sistemaacademico.dao;

import br.com.sistemaacademico.model.Questao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public class QuestaoDAO {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public QuestaoDAO(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }

    public void cadastrarQuestao(Questao questao){
        String sql = "INSERT INTO QUESTAO(id_questao, enunciado, tipo, valor_ponto, resposta_correta) " +
                "VALUES (?, ?, ?, ?, ?)";

        int linhasAfetadas = jdbcTemplate.update(sql,
                questao.getIdQuestao(),
                questao.getEnunciado(),
                questao.getTipo(),
                questao.getValorPonto(),
                questao.getRespostaCorreta()
        );

        // verificar se 'linhasAfetadas' é 1 para saber se funcionou
        if (linhasAfetadas > 0) {
            System.out.println("Uma nova questão foi inserida com sucesso!");
        }
    }

    public List<Questao> buscarTodas(){
        String sql = "SELECT id_questao, enunciado, tipo, valor_ponto, resposta_correta FROM QUESTAO";

        RowMapper<Questao> rowMapper = (rs, rowNum) -> {
            Questao questao = new Questao();
            questao.setIdQuestao(rs.getInt("id_questao"));
            questao.setEnunciado(rs.getString("enunciado"));
            questao.setTipo(rs.getString("tipo"));
            questao.setValorPonto(rs.getDouble("valor_ponto"));
            questao.setRespostaCorreta(rs.getString("resposta_correta"));
            return questao;
        };

        return jdbcTemplate.query(sql, rowMapper);
    }


}
