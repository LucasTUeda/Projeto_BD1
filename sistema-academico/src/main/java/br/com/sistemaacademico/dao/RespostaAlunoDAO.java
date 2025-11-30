package br.com.sistemaacademico.dao;

import br.com.sistemaacademico.dto.CorrecaoDTO;
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

    public List<CorrecaoDTO> buscarRespostasCorrecao (int matricula, int idAvaliacao) {
        String sql = "SELECT q.id_questao, q.enunciado, ra.texto_resposta, q.resposta_correta, q.valor_ponto, ra.nota_obtida" +
                " FROM RESPOSTA_ALUNO ra" +
                " JOIN QUESTAO q ON ra.id_questao = q.id_questao" +
                " WHERE ra.num_matricula = ? AND ra.id_avaliacao = ?";

        return jdbcTemplate.query(sql, (rs, rowNum) -> {

            // --- CORREÇÃO DO ERRO DE CAST ---
            // 1. Lê como double primitivo (o driver converte BigDecimal -> double automaticamente)
            double valorTemp = rs.getDouble("nota_obtida");

            // 2. Verifica se no banco estava NULL (para não transformar null em 0.0 sem querer)
            Double notaFinal = rs.wasNull() ? null : valorTemp;
            // --------------------------------

            return new CorrecaoDTO(
                    rs.getInt("id_questao"),
                    rs.getString("enunciado"),
                    rs.getString("texto_resposta"),
                    rs.getString("resposta_correta"),
                    rs.getDouble("valor_ponto"),
                    notaFinal // Passamos a variável segura
            );
        }, matricula, idAvaliacao);
    }
}
