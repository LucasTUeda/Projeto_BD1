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

    private final RowMapper<Questao> rowMapper = (rs, rowNum) -> {
        Questao questao = new Questao();
        questao.setIdQuestao(rs.getInt("id_questao"));
        questao.setEnunciado(rs.getString("enunciado"));
        questao.setTipo(rs.getString("tipo"));
        questao.setValorPonto(rs.getDouble("valor_ponto"));
        questao.setRespostaCorreta(rs.getString("resposta_correta"));
        return questao;
    };

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

    // -- (READ ALL) --
    public List<Questao> buscarTodas(){
        String sql = "SELECT id_questao, enunciado, tipo, valor_ponto, resposta_correta FROM QUESTAO";
        return jdbcTemplate.query(sql, rowMapper);
    }

    // -- (READ ONE) --
    public Questao buscarPorId(int idQuestao){
        String sql = "SELECT * FROM QUESTAO WHERE id_questao = ?";

        try{
            return jdbcTemplate.queryForObject(sql, rowMapper, idQuestao);
        } catch (Exception e){
            System.err.println("Nenhuma questão encontrada com o ID: " + idQuestao);
            return null;
        }
    }

    public void excluir(int idQuestao){
        String sql = "DELETE FROM QUESTAO WHERE id_questao = ?";

        jdbcTemplate.update(sql, idQuestao);
    }

    public void atualizarQuestao(Questao questao){
        String sql = "UPDATE QUESTAO SET enunciado = ?, tipo = ?, valor_ponto = ?, resposta_correta = ?"
                + " WHERE id_questao = ?";

        jdbcTemplate.update(sql,
                questao.getEnunciado(),
                questao.getTipo(),
                questao.getValorPonto(),
                questao.getRespostaCorreta(),
                questao.getIdQuestao()
        );
    }

}
