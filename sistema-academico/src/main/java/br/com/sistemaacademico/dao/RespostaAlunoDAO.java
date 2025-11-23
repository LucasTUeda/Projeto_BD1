package br.com.sistemaacademico.dao;

import br.com.sistemaacademico.dto.RespostaAlunoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Types;
import java.util.List;

@Repository
public class RespostaAlunoDAO {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public RespostaAlunoDAO(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }

    public void salvarResposta(int numMatricula, int idAvaliacao, List<RespostaAlunoDTO>respostas){
        String sql = "INSERT INTO resposta_aluno(num_matricula, id_avaliacao, id_questao, texto_resposta, nota_obtida)" +
                " VALUES (?, ?, ?, ?, ?)";

        jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement ps, int i) throws SQLException {
                RespostaAlunoDTO respostaAtual = respostas.get(i);

                ps.setInt(1, numMatricula);
                ps.setInt(2, idAvaliacao);
                ps.setInt(3, respostaAtual.getIdQuestao());
                ps.setString(4, respostaAtual.getTextoResposta());
                // como o aluno só submte, a nota é nula
                ps.setNull(5, Types.NUMERIC);
            }

            @Override
            public int getBatchSize() {
                return respostas.size(); // O número de respostas é enviado
            }
        });
    }

    public void calcularNotasAutomaticas(int numMatricula, int idAvaliacao) {
        String sql = "UPDATE RESPOSTA_ALUNO ra" +
                " SET nota_obtida" +
                " = CASE" +
                "   WHEN ra.texto_resposta = UPPER(TRIM(q.resposta_correta)) THEN q.valor_ponto" +
                "   ELSE 0.0" +
                " END" +
                " FROM QUESTAO q" +
                " WHERE ra.id_questao = q.id_questao" +
                " AND ra.num_matricula = ?" +
                " AND ra.id_avaliacao = ?" +
                " AND q.tipo = 'alternativa'"; // Ignora dissertativas (deixa NULL para o professor corrigir)

        jdbcTemplate.update(sql, numMatricula, idAvaliacao);
    }

    public void atualizarNotaManual(int numMatricula, int idAvaliacao, int idQuestao, double novaNota){
        String sql = "UPDATE RESPOSTA_ALUNO SET nota_obtida = ?" +
                " WHERE num_matricula = ? AND id_avaliacao = ? AND id_questao = ?";

        jdbcTemplate.update(sql, novaNota, numMatricula, idAvaliacao, idQuestao);
    }
}
