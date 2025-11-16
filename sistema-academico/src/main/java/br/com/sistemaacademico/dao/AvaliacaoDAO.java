package br.com.sistemaacademico.dao;

import br.com.sistemaacademico.model.Avaliacao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.util.List;

@Repository
public class AvaliacaoDAO {

    private final JdbcTemplate jdbctemplate;

    private final RowMapper<Avaliacao> avaliacaoRowMapper = (rs, rowNum) -> {
        Avaliacao avaliacao = new Avaliacao();
        avaliacao.setIdAvaliacao(rs.getInt("id_avaliacao"));
        avaliacao.setTitulo(rs.getString("titulo"));
        avaliacao.setDataFim(rs.getDate("data_fim"));
        avaliacao.setIdProfessor(rs.getInt("id_professor"));
        avaliacao.setIdDisciplina(rs.getInt("id_disciplina"));
        return avaliacao;
    };

    @Autowired
    public AvaliacaoDAO(JdbcTemplate jdbctemplate){
        this.jdbctemplate = jdbctemplate;
    }

    public int salvar(Avaliacao avaliacao){
        String sql = "INSERT INTO Avaliacao(titulo, data_fim, id_professor, id_disciplina)" +
                    "VALUES(?, ?, ?, ?)";

        KeyHolder keyholder = new GeneratedKeyHolder();

        jdbctemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, new String[]{"id_avaliacao"});

            ps.setString(1, avaliacao.getTitulo());
            ps.setDate(2, new java.sql.Date(avaliacao.getDataFim().getTime()));
            ps.setInt(3, avaliacao.getIdProfessor());
            ps.setInt(4, avaliacao.getIdDisciplina());

            return ps;
        },keyholder);

        return keyholder.getKey().intValue();


    }

    public List<Avaliacao> findPendentesByMatricula(int matricula) {

        // Este SQL encontra todas as avaliações
        // das disciplinas em que o aluno está matriculado
        // E exclui (LEFT JOIN/WHERE IS NULL) aquelas que ele já respondeu
        String sql = "SELECT a.* " +
                "FROM AVALIACAO a " +
                "JOIN MATRICULA m ON a.id_disciplina = m.id_disciplina " +
                "LEFT JOIN RESPOSTA_ALUNO r ON a.id_avaliacao = r.id_avaliacao AND r.num_matricula = m.num_matricula " +
                "WHERE m.num_matricula = ? " +
                "AND r.id_avaliacao IS NULL " + // Filtra as que NÃO foram respondidas
                "AND a.data_fim >= CURRENT_DATE"; // Filtra as que não expiraram

        // Usamos o jdbcTemplate.query (para listas) e o RowMapper
        return jdbctemplate.query(sql, avaliacaoRowMapper, matricula);
    }

    public Avaliacao buscarPorId(int idAvaliacao) {
        String sql = "SELECT * FROM AVALIACAO WHERE id_avaliacao = ?";

        try {
            // Usa o RowMapper que já definimos na classe
            return jdbctemplate.queryForObject(sql, avaliacaoRowMapper, idAvaliacao);
        } catch (Exception e) {
            System.err.println("Nenhuma avaliação encontrada com o ID: " + idAvaliacao);
            return null; // Retorna nulo se não encontrar
        }
    }
}
