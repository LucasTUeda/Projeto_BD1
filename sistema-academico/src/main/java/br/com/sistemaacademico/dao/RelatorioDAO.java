package br.com.sistemaacademico.dao;

import br.com.sistemaacademico.dto.RankingDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RelatorioDAO {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public RelatorioDAO(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<RankingDTO> gerarRankingPorDisciplina(int idDisciplina){
        // 1. Junta Usuario (para pegar nome) com Aluno e Respostas.
        // 2. Filtra pela disciplina através da Avaliação.
        // 3. Soma as notas agrupando por aluno.
        // 4. RANK() gera a posição (1º, 2º...) baseado na soma decrescente.

        String sql = "SELECT " +
                     " u.nome AS nome_aluno, " +
                     " SUM(ra.nota_obtida) AS nota_total, " +
                     " RANK() OVER (ORDER BY SUM(ra.nota_obtida) DESC) AS posicao " +
                     " FROM USUARIO u " +
                     " JOIN ALUNO a ON u.id_usuario = a.id_aluno" +
                     " JOIN RESPOSTA_ALUNO ra ON a.num_matricula = ra.num_matricula " +
                     " JOIN AVALIACAO av ON ra.id_avaliacao = av.id_avaliacao " +
                     " WHERE av.id_disciplina = ?" +
                     " GROUP BY u.id_usuario, u.nome " +
                     " ORDER BY posicao ASC";

        return jdbcTemplate.query(sql, (rs, rowNum) -> new RankingDTO(
             rs.getString("nome_aluno"),
             rs.getDouble("nota_total"),
             rs.getInt("posicao")
        ), idDisciplina);
    }
}
