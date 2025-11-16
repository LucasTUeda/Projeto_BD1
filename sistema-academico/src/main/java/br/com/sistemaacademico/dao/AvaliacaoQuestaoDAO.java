package br.com.sistemaacademico.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

@Repository
public class AvaliacaoQuestaoDAO {

    private final JdbcTemplate jdbctemplate;

    @Autowired
    public AvaliacaoQuestaoDAO(JdbcTemplate jdbctemplate){
        this.jdbctemplate = jdbctemplate;
    }

    public void salvarAssociacoes(int idAvaliacao, List<Integer> idQuestoes) {
        String sql = "INSERT INTO avaliacao_questao (id_avaliacao, id_questao)"
                + "VALUES (?, ?)";


        jdbctemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {

            @Override
            public void setValues(PreparedStatement ps, int i) throws SQLException {
                int idQuestaoAtual = idQuestoes.get(i);

                // Parâmetros do INSERT
                ps.setInt(1, idAvaliacao);
                ps.setInt(2, idQuestaoAtual);
            }

            @Override
            public int getBatchSize() {
                // Retorna o número total de INSERTs a serem executados
                return idQuestoes.size();
            }
        });
    }

    public List<Integer> findQuestaoIdsByAvaliacaoId(int idAvaliacao) {
        String sql = "SELECT id_questao FROM avaliacao_questao WHERE id_avaliacao = ?";

        // Este é um RowMapper simples, só para pegar um inteiro.
        // (rs, rowNum) -> rs.getInt("id_questao") é o mesmo que:
        // new RowMapper<Integer>() { ... }
        return jdbctemplate.query(sql, (rs, rowNum) -> rs.getInt("id_questao"), idAvaliacao);
    }
}