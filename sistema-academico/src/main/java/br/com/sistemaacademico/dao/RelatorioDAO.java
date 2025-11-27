package br.com.sistemaacademico.dao;

import br.com.sistemaacademico.dto.DesempenhoDTO;
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

    public DesempenhoDTO obterDesempenhoComparativo(int idDisciplina, int matricula){
        // 1. Calcula a média das notas das provas do aluno específico
        // 2. Calcula a média das notas das provas de todos os alunos (turma)

        String sql = "SELECT " +
                "( " +
                "SELECT AVG(soma_notas) FROM ( " +
                "   SELECT SUM(ra.nota_obtida) as soma_notas " +
                "   FROM RESPOSTA_ALUNO ra " +
                "   JOIN AVALIACAO av ON ra.id_avaliacao =  av.id_avaliacao " +
                "   WHERE av.id_disciplina = ? AND ra.num_matricula = ? " +
                "   GROUP BY ra.id_avaliacao " +
                ") as notas_aluno " +
                ") AS media_aluno, " +
                "( " +
                "SELECT AVG(soma_notas_turma) FROM ( " +
                "   SELECT SUM(ra2.nota_obtida) as soma_notas_turma " +
                "   FROM RESPOSTA_ALUNO ra2 " +
                "   JOIN AVALIACAO av2 ON ra2.id_avaliacao = av2.id_avaliacao " +
                "   WHERE av2.id_disciplina = ? " +
                "   GROUP BY ra2.id_avaliacao, ra2.num_matricula " +
                ") as notas_turma " +
                ") AS media_turma";

        return jdbcTemplate.queryForObject(sql, (rs, rowNum) -> new DesempenhoDTO(
                rs.getDouble("media_aluno"),
                rs.getDouble("media_turma")
        ), idDisciplina, matricula, idDisciplina);
    }
}
